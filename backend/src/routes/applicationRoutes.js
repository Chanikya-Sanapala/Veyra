import express from 'express';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import JobSeekerProfile from '../models/JobSeekerProfile.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

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

    // Resolve User document robustly
    let userDoc = null;
    let resolvedApplicantId = applicantId;
    
    if (applicantId) {
      if (typeof applicantId === 'string' && applicantId.includes('@')) {
        userDoc = await User.findOne({ email: applicantId.toLowerCase() }).lean();
      } else {
        userDoc = await User.findById(applicantId).lean().catch(() => null);
        if (!userDoc) {
          userDoc = await User.findOne({ $or: [{ email: applicantId }, { _id: applicantId }] }).lean().catch(() => null);
        }
      }
    }
    
    if (userDoc) {
      resolvedApplicantId = userDoc._id;
    }

    const userEmail = userDoc ? userDoc.email : (typeof applicantId === 'string' && applicantId.includes('@') ? applicantId : '');

    const profileDoc = await JobSeekerProfile.findOne({
      $or: [{ userId: resolvedApplicantId }, { userId: applicantId }]
    }).lean();

    if (!profileDoc || !profileDoc.resume || !profileDoc.resume.filePath) {
      return sendError(res, 'No resume found on your profile. Please upload a resume first.', null, 400);
    }

    // Check if already applied
    const existingApp = await Application.findOne({ job: jobId, applicant: resolvedApplicantId });
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
      const relativePath = (profileDoc.resume?.filePath || '').replace(/^[\/\\]/, '');
      const resumeAbsPath = path.resolve(process.cwd(), relativePath);

      const tempJdPath = path.resolve(process.cwd(), 'temp', `jd_${jobId}_${Date.now()}.txt`);
      if (!fs.existsSync(path.dirname(tempJdPath))) {
        fs.mkdirSync(path.dirname(tempJdPath), { recursive: true });
      }
      fs.writeFileSync(tempJdPath, jobDoc.description || jobDoc.title || 'No description');

      const aiServiceUrl = (process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
      const formData = new FormData();

      if (fs.existsSync(resumeAbsPath)) {
        formData.append('resume', fs.createReadStream(resumeAbsPath));
      } else {
        const fallbackResumeText = `Candidate Resume Profile:\nSkills: ${profileDoc.skills?.map(s => s.skillName).join(', ') || 'Software Engineer'}\nSummary: ${profileDoc.summary || 'Applicant Profile'}`;
        formData.append('resume', Buffer.from(fallbackResumeText), { filename: 'resume.txt', contentType: 'text/plain' });
      }

      formData.append('jd', fs.createReadStream(tempJdPath));
      formData.append('topk', '35');
      formData.append('fuzzy', '85');

      console.log(`[AI MATCHMAKER] Requesting AI Match HTTP API at ${aiServiceUrl}/api/match`);

      const matchRes = await axios.post(`${aiServiceUrl}/api/match`, formData, {
        headers: formData.getHeaders(),
        timeout: 60000
      });

      // Cleanup temp JD file
      if (fs.existsSync(tempJdPath)) {
        fs.unlinkSync(tempJdPath);
      }

      const matchData = matchRes.data || {};
      let score = typeof matchData.score === 'number' ? matchData.score : parseFloat(matchData.score || 60);
      if (isNaN(score) || score <= 0) score = 60;

      const suggestions = Array.isArray(matchData.missing) ? matchData.missing : [];

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

      // DELAY LOGIC: 1.5 minutes (90 seconds) secret match delay
      const randomDelay = 90 * 1000; // 90 seconds (1.5 minutes)

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

      // Send immediate Application Received confirmation email
      if (userEmail) {
        const candidateName = userDoc ? (`${userDoc.firstName || ''} ${userDoc.lastName || ''}`).trim() || userDoc.username || 'Candidate' : 'Candidate';
        const companyName = jobDoc.company || 'VEYRA Hiring Partner';
        const jobTitle = jobDoc.title || 'Position';
        const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');

        sendEmail({
          email: userEmail,
          subject: `Application Received — ${jobTitle} at ${companyName}`,
          message: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #F5F7FA; border-radius: 16px;">
              <div style="background-color: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid #EAECF0;">
                <div style="margin-bottom: 24px;">
                  <span style="font-size: 22px; font-weight: 800; color: #2161FF; letter-spacing: -0.5px;">VEYRA</span>
                </div>
                <h2 style="color: #101828; font-size: 20px; font-weight: 700; margin-bottom: 16px;">Application Received!</h2>
                <p style="color: #475467; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                  Hi <strong>${candidateName}</strong>,
                </p>
                <p style="color: #475467; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                  Thank you for applying for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong> through VEYRA.
                </p>
                <div style="background-color: #F8FAFC; padding: 16px; border-radius: 12px; border-left: 4px solid #2161FF; margin-bottom: 20px;">
                  <p style="color: #101828; font-size: 13px; font-weight: 700; margin: 0;">Status: Profile Under Review</p>
                  <p style="color: #64748B; font-size: 12px; margin-top: 4px; margin-bottom: 0;">Our AI matching engine and hiring team are actively reviewing your application and profile details.</p>
                </div>
                <p style="color: #475467; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
                  You can track your application status in real-time from your VEYRA Candidate Workspace.
                </p>
                <a href="${frontendUrl}/jobseeker-dashboard" style="display: inline-block; background-color: #2161FF; color: #FFFFFF; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 10px;">
                  Open Candidate Dashboard →
                </a>
                <hr style="border: none; border-top: 1px solid #EAECF0; margin: 32px 0 20px 0;" />
                <p style="color: #98A2B3; font-size: 12px; margin: 0;">
                  VEYRA — AI-Powered Talent Intelligence Platform
                </p>
              </div>
            </div>
          `
        }).catch(err => console.error('[EMAIL] Application confirmation error:', err));
      }

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
    ).populate('job').populate('applicant');

    if (!application) {
      return sendError(res, 'Application not found', null, 404);
    }

    // Send email notification to candidate on status update
    try {
      let candidateEmail = '';
      let candidateName = 'Candidate';
      if (application.applicant) {
        if (typeof application.applicant === 'object') {
          candidateEmail = application.applicant.email || '';
          candidateName = application.applicant.firstName || application.applicant.username || 'Candidate';
        }
      }

      const jobTitle = application.job?.title || 'the applied position';
      const companyName = application.job?.company || 'VEYRA Recruitment';

      if (candidateEmail && status === 'Shortlisted') {
        sendEmail({
          email: candidateEmail,
          subject: `Congratulations! You've been shortlisted for ${jobTitle} at ${companyName} 🎯`,
          message: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 24px; color: #101828; max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #eaecf0;">
              <div style="text-align: center; padding-bottom: 16px; border-bottom: 1px solid #f2f4f7;">
                <h1 style="color: #2161FF; margin: 0; font-size: 24px; font-weight: 800;">VEYRA AI</h1>
                <p style="color: #667085; font-size: 12px; margin-top: 4px;">Talent Acquisition Intelligence</p>
              </div>

              <div style="padding: 20px 0;">
                <h2 style="color: #101828; font-size: 18px; font-weight: 700; margin-bottom: 12px;">Congratulations, ${candidateName}! 🎉</h2>
                <p style="font-size: 14px; line-height: 1.6; color: #344054;">
                  Great news! The recruiting team at <b>${companyName}</b> has reviewed your application and <b>shortlisted</b> your profile for the <b>${jobTitle}</b> position.
                </p>

                <div style="margin: 20px 0; padding: 18px; background-color: #f8fafc; border-radius: 14px; border-left: 4px solid #2161FF;">
                  <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #101828;">📌 Next Round: Technical & Role Fit Assessment</h3>
                  <p style="margin: 0 0 10px 0; font-size: 13px; color: #475569; line-height: 1.5;">
                    As part of the shortlisted selection pool, your application is advancing to the <b>Next Assessment Round</b>.
                  </p>
                  <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #475569; line-height: 1.6;">
                    <li><b>What to Expect:</b> Technical skills evaluation & role readiness assessment.</li>
                    <li><b>Preparation:</b> Ensure a quiet environment and stable internet connection.</li>
                    <li><b>Schedule Notice:</b> An official interview invitation link will be sent to your email shortly by the recruiter.</li>
                  </ul>
                </div>

                <p style="font-size: 13px; line-height: 1.6; color: #667085;">
                  You can track your live application status anytime on your VEYRA Candidate Dashboard.
                </p>
              </div>

              <div style="text-align: center; padding-top: 16px; border-top: 1px solid #f2f4f7; color: #98a2b3; font-size: 12px;">
                <p style="margin: 0;">© ${new Date().getFullYear()} ${companyName} via VEYRA AI Platform</p>
              </div>
            </div>
          `
        }).catch(err => console.error('Shortlist email error:', err));
      } else if (candidateEmail && status === 'Rejected') {
        sendEmail({
          email: candidateEmail,
          subject: `Application Update: ${jobTitle} at ${companyName}`,
          message: `
            <div style="font-family: Arial, sans-serif; padding: 24px; color: #101828; max-width: 560px; margin: 0 auto; border: 1px solid #eaecf0; border-radius: 16px;">
              <h2 style="color: #101828; margin-top: 0;">Application Status Update</h2>
              <p>Hi <b>${candidateName}</b>,</p>
              <p>Thank you for your interest in the <b>${jobTitle}</b> position at <b>${companyName}</b> and for taking the time to apply.</p>
              <p>After careful review, we have decided to move forward with other candidates whose qualifications closely match our current requirements.</p>
              <p>We appreciate your effort and wish you the best in your job search.</p>
              <br/>
              <p>Best regards,<br/><b>VEYRA Recruitment Team</b></p>
            </div>
          `
        }).catch(err => console.error('Rejection email error:', err));
      }
    } catch (emailErr) {
      console.error('Status update notification warning:', emailErr.message);
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
