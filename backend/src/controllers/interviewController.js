import Interview from '../models/Interview.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import crypto from 'crypto';

// Python Service URL
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';

// Helper to create interview internal (for use by other controllers)
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

// Fix Path Resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to create interview internal (for use by other controllers)
export const createInterviewInternal = async (candidateId, jobId) => {
    const job = await Job.findById(jobId);
    if (!job) throw new Error('Job not found');

    const user = await User.findById(candidateId);
    if (!user) throw new Error('Candidate not found');

    // Check if valid interview already exists
    const existingInterest = await Interview.findOne({
        candidateId,
        jobId,
        status: { $in: ['pending'] },
        expiresAt: { $gt: new Date() }
    });

    // Load Predefined Questions from AI folder (Absolute Path via __dirname)
    // backend/src/controllers -> ../../../ai/questions.txt
    const questionsPath = path.resolve(__dirname, '../../../ai/questions.txt');
    let fileQuestions = ["Tell me about yourself.", "Why do you want this job?"];

    console.log("Loading questions from:", questionsPath);

    try {
        if (fs.existsSync(questionsPath)) {
            const fileContent = fs.readFileSync(questionsPath, 'utf-8');
            fileQuestions = fileContent.split('\n').map(q => q.trim()).filter(q => q.length > 0);
            console.log(`Loaded ${fileQuestions.length} questions.`);
        } else {
            console.error(`File NOT found at: ${questionsPath}`);
        }
    } catch (e) { console.error("Error reading questions file:", e); }

    if (existingInterest) {
        // FORCE UPDATE
        existingInterest.questions = fileQuestions;
        await existingInterest.save();

        const token = existingInterest.uniqueToken;
        const link = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/interview/${token}`;
        return { link, user, interview: existingInterest, token };
    }

    // New Interview
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const interview = new Interview({
        candidateId,
        jobId,
        uniqueToken: token,
        questions: fileQuestions,
        expiresAt,
        status: 'pending',
        title: `AI Interview for ${job.title}`
    });

    await interview.save();

    const link = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/interview/${token}`;
    return { link, user, interview, token };
};

export const scheduleInterview = async (req, res) => {
    try {
        const { candidateId, jobId, interviewType = 'AI Interview', scheduledDate, scheduledTime } = req.body;
        if (!candidateId || !jobId) return sendError(res, 'Missing IDs', null, 400);

        const { link, interview, token, expiresAt } = await createInterviewInternal(candidateId, jobId);

        // Fetch Job and Candidate details for Email
        try {
            const sendEmailModule = await import('../utils/sendEmail.js');
            const jobDoc = await Job.findById(jobId).lean();
            const userDoc = await User.findById(candidateId).lean();

            if (userDoc && userDoc.email) {
                const candidateName = userDoc.firstName || userDoc.username || 'Candidate';
                const jobTitle = jobDoc?.title || 'the position';
                const companyName = jobDoc?.company || 'VEYRA Recruitment';
                const dateStr = scheduledDate ? `${scheduledDate} at ${scheduledTime || 'Scheduled Time'}` : 'As soon as possible';

                await sendEmailModule.default({
                    email: userDoc.email,
                    subject: `Interview Invitation: ${jobTitle} at ${companyName}`,
                    message: `
                        <div style="font-family: Arial, sans-serif; padding: 24px; color: #101828; max-width: 560px; margin: 0 auto; border: 1px solid #eaecf0; border-radius: 16px;">
                            <h2 style="color: #2161FF; margin-top: 0;">You're Invited to an Interview! 🎯</h2>
                            <p>Hi <b>${candidateName}</b>,</p>
                            <p>Congratulations! You have been invited to a <b>${interviewType}</b> for the position of <b>${jobTitle}</b> at <b>${companyName}</b>.</p>
                            <div style="background-color: #f8fafc; padding: 16px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #2161FF;">
                                <p style="margin: 0; font-size: 14px; font-weight: 700; color: #101828;">Interview Details:</p>
                                <p style="margin: 4px 0 0 0; font-size: 13px; color: #475569;">Type: <b>${interviewType}</b></p>
                                <p style="margin: 4px 0 0 0; font-size: 13px; color: #475569;">Schedule: <b>${dateStr}</b></p>
                            </div>
                            <div style="text-align: center; margin: 28px 0;">
                                <a href="${link}" style="display: inline-block; padding: 12px 28px; background-color: #2161FF; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 10px; font-size: 14px;">
                                    Start Interview →
                                </a>
                            </div>
                            <p style="font-size: 12px; color: #667085;">Note: Please complete the interview before the token expires.</p>
                            <br/>
                            <p style="font-size: 13px; color: #344054;">Best regards,<br/><b>VEYRA Recruitment Team</b></p>
                        </div>
                    `
                });
            }
        } catch (emailErr) {
            console.error('Interview invite email error:', emailErr.message);
        }

        sendSuccess(res, 'Interview scheduled successfully', { interviewId: interview._id, token, link });
    } catch (error) {
        console.error('Schedule error:', error);
        sendError(res, 'Failed to schedule interview', null, 500);
    }
};

export const getInterviewByToken = async (req, res) => {
    try {
        const { token } = req.params;
        const interview = await Interview.findOne({ uniqueToken: token }).populate('jobId', 'title company');

        if (!interview) return sendError(res, 'Invalid token', null, 404);
        if (new Date() > new Date(interview.expiresAt)) return sendError(res, 'Expired link', null, 410);
        if (interview.status === 'completed') return sendError(res, 'Already completed', null, 400);

        sendSuccess(res, 'Details retrieved', {
            questions: interview.questions,
            jobTitle: interview.jobId.title,
            company: interview.jobId.company,
            expiresAt: interview.expiresAt
        });
    } catch (error) {
        sendError(res, 'Server error', null, 500);
    }
};

export const submitInterview = async (req, res) => {
    try {
        const { token } = req.body;
        if (!req.file) return sendError(res, 'No recording uploaded', null, 400);

        const interview = await Interview.findOne({ uniqueToken: token });
        if (!interview) return sendError(res, 'Interview not found', null, 404);

        // Move file to AI folder storage
        // backend/src/controllers -> ../../../ai/static/recordings
        const targetDir = path.resolve(__dirname, '../../../ai/static/recordings');

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const fileName = `interview_${interview._id}.webm`;
        const targetPath = path.join(targetDir, fileName);

        // Assuming multer saved it to 'uploads/interviews' or similar temp
        // We need to move it. 
        // Note: req.file.path is the current temp path
        fs.renameSync(req.file.path, targetPath);

        console.log(`Recording saved to: ${targetPath}`);

        interview.recordingVideoPath = targetPath;
        interview.status = 'completed';
        await interview.save();

        sendSuccess(res, 'Interview submitted', { filePath: targetPath });

    } catch (error) {
        console.error('Submit error:', error);
        sendError(res, 'Failed to submit', null, 500);
    }
};
