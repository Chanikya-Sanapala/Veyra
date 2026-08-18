import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const cleanEnvStr = (str) => (str || '').replace(/\s+/g, '').replace(/^["']|["']$/g, '');

const sendEmail = async (options) => {
    try {
        const emailUser = (process.env.EMAIL_USER || '').trim().replace(/^["']|["']$/g, '');
        const emailPass = cleanEnvStr(process.env.EMAIL_PASS);

        if (!emailUser || !emailPass) {
            console.warn(`\n⚠️ [EMAIL WARNING] EMAIL_USER or EMAIL_PASS missing in backend environment variables. Real email dispatch skipped. Please configure EMAIL_USER and EMAIL_PASS on Render.\n`);
            return { simulated: true };
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        const mailOptions = {
            from: `"VEYRA Recruitment" <${emailUser}>`,
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