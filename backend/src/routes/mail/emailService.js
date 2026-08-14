import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter;
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
};

/**
 * Sends a welcome/registration email
 * @param {string} toEmail - Recipient email
 * @param {string} username - Recipient name
 * @param {string} userType - Recipient userType
 */
export async function sendWelcomeEmail(toEmail, username, userType) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.log(`[EMAIL MOCK] Skipping email send (EMAIL_USER/EMAIL_PASS not configured) to ${toEmail}`);
    return;
  }

  try {
    const info = await getTransporter().sendMail({
      from: `"Chanix" <${emailUser}>`,
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
