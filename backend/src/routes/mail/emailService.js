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
  const emailUser = (process.env.EMAIL_USER || '').trim().replace(/^["']|["']$/g, '');
  const emailPass = cleanEnvStr(process.env.EMAIL_PASS);

  if (!emailUser || !emailPass) {
    console.log(`[EMAIL MOCK] Skipping email send (EMAIL_USER/EMAIL_PASS missing) to ${toEmail}`);
    return;
  }

  try {
    const maskedRecipient = toEmail.replace(/(?<=^..).*?(?=@)/, '***');
    console.log(`[EMAIL DEBUG] Configured user: YES, Configured pass: YES, Recipient: ${maskedRecipient}`);

    const transporter = createTransporter(emailUser, emailPass);
    await transporter.verify();
    console.log(`[EMAIL DEBUG] SMTP Connection verify: PASS`);

    const info = await transporter.sendMail({
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

    console.log(`[EMAIL DEBUG] sendMail result: PASS, MessageID: ${info.messageId}, Response: ${info.response}`);
  } catch (error) {
    console.error(`[EMAIL DEBUG] sendMail result: FAIL | Code: ${error.code || 'NONE'} | Command: ${error.command || 'NONE'} | ResponseCode: ${error.responseCode || 'NONE'} | Message: ${error.message}`);
  }
}

export default sendWelcomeEmail;
