import mongoose from 'mongoose';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import sendEmail from './sendEmail.js';
import { createInterviewInternal } from '../controllers/interviewController.js';

const checkAndSendEmails = async () => {
    // Only query if DB is connected (readyState === 1)
    if (mongoose.connection.readyState !== 1) {
        return;
    }

    try {
        const now = new Date();
        // Find applications where scheduled time has passed and email hasn't been sent
        const pendingApps = await Application.find({
            scheduledEmailAt: { $lte: now },
            emailSent: false
        }).populate('job'); // We need job details

        if (!pendingApps || pendingApps.length === 0) return;

        console.log(`[SCHEDULER] Found ${pendingApps.length} pending emails.`);

        for (const app of pendingApps) {
            try {
                const job = app.job;
                if (!job) {
                    console.error(`[SCHEDULER] Job not found for application ${app._id}`);
                    continue;
                }

                const applicant = await User.findById(app.applicant);
                if (!applicant || !applicant.email) {
                    console.error(`[SCHEDULER] Applicant not found for application ${app._id}`);
                    continue;
                }

                const score = app.matchScore || 0;

                if (score < 65) {
                    // Rejection Email
                    await sendEmail({
                        email: applicant.email,
                        subject: `Application Evaluation & AI Resume Match Score — ${job.title}`,
                        message: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #F5F7FA; border-radius: 16px;">
                                <div style="background-color: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid #EAECF0;">
                                    <div style="margin-bottom: 24px;">
                                        <span style="font-size: 22px; font-weight: 800; color: #2161FF; letter-spacing: -0.5px;">VEYRA</span>
                                    </div>
                                    <h2 style="color: #101828; font-size: 20px; font-weight: 700; margin-bottom: 16px;">Resume AI Evaluation Complete</h2>
                                    <p style="color: #475467; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                                        Dear <strong>${applicant.firstName || 'Candidate'}</strong>,
                                    </p>
                                    <p style="color: #475467; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                                        Our AI matching engine has completed evaluating your resume for the <strong>${job.title}</strong> position at <strong>${job.company}</strong>.
                                    </p>
                                    <div style="background-color: #FEF3F2; padding: 20px; border-radius: 12px; border: 1px solid #FECDCA; margin-bottom: 20px; text-center;">
                                        <span style="font-size: 12px; font-weight: 700; color: #B42318; text-transform: uppercase;">Your Resume AI Match Score</span>
                                        <div style="font-size: 32px; font-weight: 900; color: #B42318; margin: 6px 0;">${score}%</div>
                                        <p style="color: #B42318; font-size: 13px; margin: 0;">Status: Profile Not Selected at this time</p>
                                    </div>
                                    <p style="color: #475467; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
                                        While your profile did not reach the threshold for this specific position, we encourage you to apply for other roles on VEYRA.
                                    </p>
                                    <hr style="border: none; border-top: 1px solid #EAECF0; margin: 32px 0 20px 0;" />
                                    <p style="color: #98A2B3; font-size: 12px; margin: 0;">
                                        VEYRA — AI-Powered Talent Intelligence Platform
                                    </p>
                                </div>
                            </div>
                            `
                    });
                    console.log(`[SCHEDULER] Sent rejection email to ${applicant.email} for job ${job.title} (Score: ${score}%)`);

                } else {
                    try {
                        const { link } = await createInterviewInternal(app.applicant, job._id);

                        await sendEmail({
                            email: applicant.email,
                            subject: `🎉 Congratulations! Shortlisted for AI Interview — ${job.title}`,
                            message: `
                                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #F5F7FA; border-radius: 16px;">
                                    <div style="background-color: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid #EAECF0;">
                                        <div style="margin-bottom: 24px;">
                                            <span style="font-size: 22px; font-weight: 800; color: #2161FF; letter-spacing: -0.5px;">VEYRA</span>
                                        </div>
                                        <h2 style="color: #101828; font-size: 20px; font-weight: 700; margin-bottom: 16px;">Congratulations! You Are Shortlisted</h2>
                                        <p style="color: #475467; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                                            Hi <strong>${applicant.firstName || 'Candidate'}</strong>,
                                        </p>
                                        <p style="color: #475467; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                                            Great news! Our AI matching engine evaluated your resume for <strong>${job.title}</strong> at <strong>${job.company}</strong>.
                                        </p>
                                        <div style="background-color: #ECFDF5; padding: 20px; border-radius: 12px; border: 1px solid #A7F3D0; margin-bottom: 20px; text-center;">
                                            <span style="font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase;">Your Resume AI Match Score</span>
                                            <div style="font-size: 32px; font-weight: 900; color: #047857; margin: 6px 0;">${score}%</div>
                                            <p style="color: #047857; font-size: 13px; margin: 0; font-weight: 700;">Status: Shortlisted for AI Interview Round</p>
                                        </div>
                                        <p style="color: #475467; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
                                            Please click below to start your AI technical interview:
                                        </p>
                                        <a href="${link}" style="display: inline-block; background-color: #2161FF; color: #FFFFFF; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 12px;">
                                            Start AI Interview Now →
                                        </a>
                                        <hr style="border: none; border-top: 1px solid #EAECF0; margin: 32px 0 20px 0;" />
                                        <p style="color: #98A2B3; font-size: 12px; margin: 0;">
                                            VEYRA — AI-Powered Talent Intelligence Platform
                                        </p>
                                    </div>
                                </div>
                                `
                        });
                        console.log(`[SCHEDULER] Sent interview email with match score (${score}%) to ${applicant.email} for job ${job.title}`);
                    } catch (err) {
                        console.error(`[SCHEDULER] Failed to schedule interview/email for ${applicant.email}:`, err);
                    }
                }

                // Mark as sent
                app.emailSent = true;
                await app.save();

            } catch (innerErr) {
                console.error(`[SCHEDULER] Error processing app ${app._id}:`, innerErr);
            }
        }

    } catch (error) {
        console.error('[SCHEDULER] Error in check loop:', error.message);
    }
};

export const startScheduler = () => {
    console.log('⏰ Scheduler started. Checking for pending emails every 15 seconds.');
    // Check immediately on startup
    checkAndSendEmails();
    // Check every 15 seconds
    setInterval(checkAndSendEmails, 15 * 1000);
};

export default startScheduler;
