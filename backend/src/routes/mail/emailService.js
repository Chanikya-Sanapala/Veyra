import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends a welcome/registration email
 * @param {string} toEmail - Recipient email
 * @param {string} username - Recipient name
 * @param {string} userType - Recipient userType
 */
export async function sendWelcomeEmail(toEmail, username, userType) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log(`[EMAIL MOCK] Skipping email send (EMAIL_USER/EMAIL_PASS not configured) to ${toEmail}`);
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Chanix" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Welcome to AI Smart Engine 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome, ${username} ${userType}!</h2>
          <p>Thank you for registering at <b>AI Smart Engine</b>. We're excited to have you!</p>
          <p>Feel free to explore and get started.</p>
          <br>
          <p>Best,</p>
          <p><b>Smart Engine Job Portal</b></p>
        </div>
      `,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
}

export default sendWelcomeEmail;
