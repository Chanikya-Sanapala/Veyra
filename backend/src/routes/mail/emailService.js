import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const cleanEnvStr = (str) => (str || '').replace(/\s+/g, '').replace(/^["']|["']$/g, '');

const createTransporter = (user, pass) => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user: user,
      pass: pass,
    },
  });
};

/**
 * Sends a welcome/registration email
 * @param {string} toEmail - Recipient email
 * @param {string} username - Recipient name
 * @param {string} userType - Recipient userType
 */
export async function sendWelcomeEmail(toEmail, username, userType) {
  const welcomeHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 24px; color: #101828; max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #eaecf0;">
      <div style="text-align: center; padding-bottom: 20px; border-b: 1px solid #f2f4f7;">
        <h1 style="color: #2161FF; margin: 0; font-size: 26px; font-weight: 800; tracking-tight: -0.02em;">VEYRA AI</h1>
        <p style="color: #667085; font-size: 13px; margin-top: 4px;">Future of AI Recruitment</p>
      </div>

      <div style="padding: 24px 0;">
        <h2 style="color: #101828; font-size: 20px; font-weight: 700; margin-bottom: 12px;">Welcome to VEYRA, ${username}! 🎉</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #344054;">
          Thank you for joining <b>VEYRA AI Recruitment Platform</b> as a <b>${userType}</b>.
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #344054;">
          Your account is active and ready. Explore automated AI resume intelligence, instant candidate matching, and smart interview workflows.
        </p>
        
        <div style="margin: 24px 0; padding: 16px; background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #2161FF;">
          <p style="margin: 0; font-size: 13px; font-weight: 600; color: #1e293b;">Next Steps:</p>
          <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 13px; color: #475569;">
            <li>Upload your latest resume in <b>My Profile</b></li>
            <li>Explore recommended opportunities</li>
            <li>Get secret AI match score evaluations directly in your email</li>
          </ul>
        </div>
      </div>

      <div style="text-align: center; padding-top: 20px; border-t: 1px solid #f2f4f7; color: #98a2b3; font-size: 12px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} VEYRA AI Recruitment Engine. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    const sendEmailModule = await import('../../utils/sendEmail.js');
    await sendEmailModule.default({
      email: toEmail,
      subject: "Welcome to VEYRA AI — Account Created Successfully 🎉",
      message: welcomeHtml
    });
  } catch (error) {
    console.error('❌ Error sending Welcome Email:', error.message);
  }
}

export default sendWelcomeEmail;
