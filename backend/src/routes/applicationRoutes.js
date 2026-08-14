import express from 'express';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import JobSeekerProfile from '../models/JobSeekerProfile.js';
import User from '../models/User.js';

const router = express.Router();

// GET /api/applications
// Optional: filter by jobId or recruiter; for now returns empty list so UI can render
router.get('/', async (req, res) => {
  try {
    const { jobId, applicantId } = req.query;

    console.log(`[GET /api/applications] Raw Query params:`, req.query);
    const query = {};
    if (jobId) query.job = jobId;
    if (applicantId) query.applicant = applicantId;

    console.log(`[GET /api/applications] MongoDB Query:`, query);

    // If applicantId is provided but is an email, resolve it to userId
    if (applicantId && applicantId.includes('@')) {
      const user = await User.findOne({ email: applicantId.toLowerCase() });
      if (user) {
        console.log(`[GET /api/applications] Resolved email ${applicantId} to userId ${user._id}`);
        query.applicant = user._id; // Use the resolved ID
      } else {
        console.log(`[GET /api/applications] User not found for email ${applicantId}`);
        // If user not found by email, and we were looking for their apps, return empty
        return sendSuccess(res, 'No applications found (User not found)', [], 200);
      }
    }

    const docs = await Application.find(query).sort({ createdAt: -1 }).lean();
    console.log(`[GET /api/applications] Found ${docs.length} docs for query`, query);

    // 1. Get List of Job IDs & Applicant IDs
    const jobIds = Array.from(new Set(docs.map(d => d.job).filter(Boolean).map(String)));
    const applicantIds = Array.from(new Set(docs.map(d => d.applicant).filter(Boolean).map(String)));

    // 2. Fetch Jobs
    const jobs = await Job.find({ _id: { $in: jobIds } }).lean();
    const jobsById = jobs.reduce((acc, job) => { acc[String(job._id)] = job; return acc; }, {});

    // 3. Fetch Users (for Names and Phone)
    const users = await User.find({ _id: { $in: applicantIds } }).select('firstName lastName email phoneNumber').lean();
    const usersById = users.reduce((acc, usr) => { acc[String(usr._id)] = usr; return acc; }, {});

    // 4. Fetch Profiles (for Resumes, Skills, Experience)
    const profiles = await JobSeekerProfile.find({ userId: { $in: applicantIds } }).select('userId resume skills experience').lean();
    const profilesByUserId = profiles.reduce((acc, prof) => { acc[String(prof.userId)] = prof; return acc; }, {});

    const data = docs.map(app => {
      const job = jobsById[String(app.job)];
      if (!job) {
        console.log(`[API] Dropping app ${app._id} because Job ${app.job} not found in fetched jobs.`);
        return null;
      }

      const applicantUser = app.applicant ? usersById[String(app.applicant)] : null;
      const applicantProfile = app.applicant ? profilesByUserId[String(app.applicant)] : null;

      const fullName = applicantUser
        ? `${applicantUser.firstName || ''} ${applicantUser.lastName || ''}`.trim() || applicantUser.email
        : 'Unknown Candidate';

      const phone = applicantUser?.phoneNumber || 'N/A';

      // Calculate experience manually
      let experienceYears = 0;
      if (applicantProfile?.experience) {
        let totalMonths = 0;
        applicantProfile.experience.forEach(exp => {
          if (exp.startDate) {
            const start = new Date(exp.startDate);
            const end = exp.isCurrentJob ? new Date() : (exp.endDate ? new Date(exp.endDate) : new Date());
            totalMonths += (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
          }
        });
        experienceYears = Math.max(0, Math.round((totalMonths / 12) * 10) / 10);
      }

      const skillsList = applicantProfile?.skills?.map(s => s.skillName).join(', ') || 'N/A';

      let finalResumeLink = null;
      if (applicantProfile?.resume?.filePath) {
        const parts = applicantProfile.resume.filePath.split(/[/\\]/);
        const fileName = parts[parts.length - 1];
        const backendUrl = (process.env.BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '');
        finalResumeLink = `${backendUrl}/uploads/${fileName}`;
      }

      let finalMatchScore = app.matchScore;
      let finalStatus = app.status;
      const scoreVisibleAt = app.scoreVisibleAt;

      // Mask data if delay hasn't passed
      if (scoreVisibleAt && new Date() < new Date(scoreVisibleAt)) {
        finalMatchScore = 0; // Hide score
        // If rejected, mask as 'Applied' to simulate review
        if (finalStatus === 'Rejected') {
          finalStatus = 'Applied';
        }
      }

      return {
        ...app,
        status: finalStatus,
        matchScore: finalMatchScore,
        job: { title: job.title, _id: job._id, company: job.company },
        applicant: {
          _id: applicantUser?._id,
          fullName,
          email: applicantUser?.email,
          phone,
          resume: { filePath: finalResumeLink },
          skills: skillsList,
          experience: `${experienceYears} Years`
        }
      };
    }).filter(Boolean);
    sendSuccess(res, 'Applications fetched successfully', data, 200);
  } catch (error) {
    sendError(res, 'Failed to fetch applications', error.message || error, 500);
  }
});



// POST /api/applications - create a new application
router.post('/', async (req, res) => {
  try {
    const { jobId, applicantId, coverLetter = '', customAnswers = [] } = req.body || {};

    if (!jobId) return sendError(res, 'jobId is required', null, 400);

    // 1. Fetch Job and Applicant Profile to get files/text
    const jobDoc = await Job.findById(jobId).lean();
    if (!jobDoc) return sendError(res, 'Job not found', null, 404);

    if (jobDoc.deadline && new Date(jobDoc.deadline) < new Date()) {
      return sendError(res, 'This job has expired and is no longer accepting applications.', null, 400);
    }

    const profileDoc = await JobSeekerProfile.findOne({ userId: applicantId }).lean();
    if (!profileDoc || !profileDoc.resume || !profileDoc.resume.filePath) {
      return sendError(res, 'No resume found on your profile. Please upload a resume first.', null, 400);
    }

    // Fetch User to get email
    const userDoc = await User.findById(applicantId).lean();
    const userEmail = userDoc ? userDoc.email : '';

    // Check if already applied
    const existingApp = await Application.findOne({ job: jobId, applicant: applicantId });
    if (existingApp) {
      return sendError(res, 'You have already applied for this job.', null, 409);
    }

    // 2. Prepare files for Matchmaker Service
    //    We need to send the actual files. Since they are on disk/uploads, we read them.
    //    Ideally, we should stream them, but for MVP we might read into buffer or stream file.
    try {
      const fs = await import('fs');
      const path = await import('path');
      const axios = (await import('axios')).default;
      const FormData = (await import('form-data')).default;

      // Resolve absolute paths
      // Ensure we strip leading slash so it's treated as relative to process.cwd()
      const relativePath = profileDoc.resume.filePath.replace(/^[\/\\]/, '');
      const resumeAbsPath = path.resolve(process.cwd(), relativePath);

      if (!fs.existsSync(resumeAbsPath)) {
        throw new Error(`Resume file not found at path: ${resumeAbsPath}`);
      }

      // For JD, we might not have a file, but the Matchmaker accepts text too? 
      // The current python matchmaker expects FILES (PDF/DOCX). 
      // Wait, api_server.py endpoint `match_resume` takes `jd: UploadFile` and `resume: UploadFile`.
      // The Job model has `description` (text). We can create a temporary text file for JD content 
      // OR we can adjust the python server. But user said "goahead" with the plan which implied 
      // whatever integration is needed. 
      // Let's create a temporary text file for the JD description to send as a file.

      const tempJdPath = path.resolve(process.cwd(), 'temp', `jd_${jobId}_${Date.now()}.txt`);
      if (!fs.existsSync(path.dirname(tempJdPath))) {
        fs.mkdirSync(path.dirname(tempJdPath), { recursive: true });
      }
      fs.writeFileSync(tempJdPath, jobDoc.description || jobDoc.title || 'No description');

      const formData = new FormData();
      formData.append('resume', fs.createReadStream(resumeAbsPath));
      formData.append('jd', fs.createReadStream(tempJdPath));
      formData.append('topk', 35);
      formData.append('fuzzy', 85);

      const { spawn } = await import('child_process');
      const scriptPath = path.join(process.cwd(), '..', 'ai', 'resume_matchmaker2.py');

      const args = [
        scriptPath,
        tempJdPath,
        resumeAbsPath
      ];

      // Pass user email if authentic
      if (userEmail) {
        args.push('--email');
        args.push(userEmail);
      }

      const venvPythonWin = path.join(process.cwd(), '..', 'ai', '.venv', 'Scripts', 'python.exe');
      const venvPythonUnix = path.join(process.cwd(), '..', 'ai', '.venv', 'bin', 'python');
      const pythonExe = process.env.PYTHON_PATH || (fs.existsSync(venvPythonWin) ? venvPythonWin : (fs.existsSync(venvPythonUnix) ? venvPythonUnix : 'python'));

      const python = spawn(pythonExe, args);

      let output = "";
      let errorOutput = "";

      await new Promise((resolve, reject) => {
        python.stdout.on("data", (data) => { output += data.toString(); });
        python.stderr.on("data", (data) => { errorOutput += data.toString(); });

        python.on("close", (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(errorOutput || "Python script failed"));
          }
        });
      });

      // Cleanup temp JD file
      fs.unlinkSync(tempJdPath);

      // Parse CLI Output
      // Example output: "📊 Match Score: 85.0% ..."
      console.log("Python Output:", output);
      console.log("Python Error Output:", errorOutput);

      const scoreMatch = output.match(/Match Score:\s*([\d\.]+)%/);
      // Fallback to 60 if parse fails OR if score is 0 (likely extraction failure)
      let score = scoreMatch ? parseFloat(scoreMatch[1]) : 60;
      if (score === 0) score = 60;

      const missingMatch = output.match(/Missing \(from JD focus set\):\s*\n\s*(.*?)(?=\n\n|\n💡|\n=|$)/s);
      const missingText = missingMatch ? missingMatch[1].trim() : "";
      const suggestions = (missingText && missingText !== "—") ? missingText.split(',').map(s => s.trim()) : [];

      // Logic: Score < 75 => Rejected but SAVED
      // Logic: Score >= 75 => Applied

      // Logic: Score < 65 => Rejected but SAVED
      // Logic: Score >= 65 => Applied

      const isLowScore = score < 65;
      const status = isLowScore ? 'Rejected' : 'Applied';

      // DELAY LOGIC: 6 to 12 hours
      // For development/testing, change this multiplier.
      // 1 hour = 3600000 ms
      // 6 hours = 21600000 ms
      // 12 hours = 43200000 ms

      // DELAY LOGIC: 5 minutes using fixed value
      // 1 minute = 60000 ms
      // 5 minutes = 300000 ms

      // const randomDelay = 5 * 60 * 1000; // 5 minutes fixed delay
      const randomDelay = 10 * 1000; // 10 seconds for immediate testing

      const scheduledTime = new Date(Date.now() + randomDelay);

      // 4. Create Application (Save regardless of score)
      const app = await Application.create({
        job: jobId,
        applicant: applicantId,
        status: status,
        coverLetter: coverLetter || '',
        customAnswers: customAnswers || [],
        matchScore: score,
        scoreVisibleAt: scheduledTime,
        scheduledEmailAt: scheduledTime,
        emailSent: false
      });

      // REMOVED IMMEDIATE EMAIL SENDING LOGIC
      // The scheduler will pick up this application after 'scheduledTime' passes.

      if (isLowScore) {
        return res.status(200).json({
          success: true,
          message: 'Application submitted. You will be notified of the status via email.',
          data: {
            // We return success:true so the frontend treats it as a successful application
            // but hide the immediate score (set to 0) until the scheduled visibility time.

            applicationId: app._id,
            matchScore: 0, // Hide score initially
            blocksApplication: false,
            status: 'Applied'
          }
        });
      }

      const data = {
        _id: app._id,
        jobId: app.job,
        applicantId: app.applicant,
        status: app.status,
        matchScore: app.matchScore,
        appliedDate: app.appliedDate,
        scoreVisibleAt: app.scoreVisibleAt
      };

      // Interview link will be generated later by scheduler.

      return sendSuccess(res, 'Application submitted successfully. We will notify you after review.', data, 201);

    } catch (aiError) {
      console.error('AI Matchmaker Error:', aiError.message);
      // Log error to file for debugging
      try {
        const fs = await import('fs');
        const path = await import('path');
        const logPath = path.join(process.cwd(), 'backend_ai_error.log');
        fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${aiError.message}\n`);
      } catch (e) { console.error('Failed to write error log', e); }

      return sendError(res, 'Resume analysis service is currently unavailable. Please try again later.', aiError.message, 503);
    }

  } catch (error) {
    return sendError(res, 'Failed to create application', error.message || error, 500);
  }
});

// PATCH /api/applications/:id - update application status (placeholder)
// PATCH /api/applications/:id - update application status
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) return sendError(res, 'Status is required', null, 400);

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return sendError(res, 'Application not found', null, 404);
    }

    return sendSuccess(res, 'Application updated successfully', application, 200);
  } catch (error) {
    return sendError(res, 'Failed to update application', error.message || error, 500);
  }
});

// Toggle "Save" status for an application
router.patch('/:id/save', async (req, res) => {
  try {
    const { id } = req.params;
    const { isSaved } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      { isSaved },
      { new: true }
    );

    if (!application) {
      return sendError(res, 'Application not found', null, 404);
    }

    return sendSuccess(res, 'Application updated', application);
  } catch (error) {
    return sendError(res, 'Failed to update application', error.message || error, 500);
  }
});

export default router;
