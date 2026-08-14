import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const cleanEnvStr = (str) => (str || '').replace(/\s+/g, '').replace(/^["']|["']$/g, '');

let transporter;
const getTransporter = (user, pass) => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: pass,
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
  const emailUser = (process.env.EMAIL_USER || '').trim().replace(/^["']|["']$/g, '');
  const emailPass = cleanEnvStr(process.env.EMAIL_PASS);

  if (!emailUser || !emailPass) {
    console.log(`[EMAIL MOCK] Skipping email send (EMAIL_USER/EMAIL_PASS missing) to ${toEmail}`);
    return;
  }

  try {
    const info = await getTransporter(emailUser, emailPass).sendMail({
      from: `"Chanix AI" <${emailUser}>`,
      to: toEmail,
      subject: "Welcome to AI Smart Engine 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #2563eb;">Welcome, ${username}!</h2>
          <p>Thank you for registering as a <b>${userType}</b> at <b>Chanix AI Recruitment Platform</b>.</p>
          <p>We are excited to have you on board! Explore AI resume matching, automated scheduling, and smart job recommendations.</p>
          <br>
          <p>Best regards,</p>
          <p><b>The Chanix AI Team</b></p>
        </div>
      `,
    });

    console.log("✅ Welcome email sent to", toEmail, "Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending welcome email to", toEmail, ":", error.message);
  }
}

export default sendWelcomeEmail;
