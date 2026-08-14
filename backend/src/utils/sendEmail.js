import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const cleanEnvStr = (str) => (str || '').replace(/\s+/g, '').replace(/^["']|["']$/g, '');

const sendEmail = async (options) => {
    try {
        const emailUser = (process.env.EMAIL_USER || '').trim().replace(/^["']|["']$/g, '');
        const emailPass = cleanEnvStr(process.env.EMAIL_PASS);

        if (!emailUser || !emailPass) {
            console.log(`[EMAIL MOCK] Skipping email send (EMAIL_USER/EMAIL_PASS missing) to ${options.email}`);
            return;
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        const mailOptions = {
            from: `"Chanix AI" <${emailUser}>`,
            to: options.email,
            subject: options.subject,
            html: options.message,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully to %s: %s", options.email, info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Error sending email to %s:", options.email, error.message);
    }
};

export default sendEmail;