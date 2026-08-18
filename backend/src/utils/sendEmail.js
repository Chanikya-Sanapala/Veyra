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

        const mailOptions = {
            from: `"VEYRA Recruitment" <${emailUser}>`,
            to: options.email,
            subject: options.subject,
            html: options.message,
        };

        // Primary Transport: Gmail Service
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: emailUser,
                    pass: emailPass,
                },
                tls: { rejectUnauthorized: false }
            });
            const info = await transporter.sendMail(mailOptions);
            console.log("✅ Email sent successfully via Gmail Service to %s: %s", options.email, info.messageId);
            return info;
        } catch (serviceErr) {
            console.warn("⚠️ Gmail service transport failed (%s). Retrying with Direct SSL Port 465...", serviceErr.message);
            
            // Secondary Fallback Transport: Direct SSL Port 465
            const fallbackTransporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: emailUser,
                    pass: emailPass,
                },
                tls: { rejectUnauthorized: false }
            });
            const info = await fallbackTransporter.sendMail(mailOptions);
            console.log("✅ Email sent successfully via Direct SSL to %s: %s", options.email, info.messageId);
            return info;
        }
    } catch (error) {
        console.error("❌ Error sending email to %s:", options.email, error.message);
        throw error;
    }
};

export default sendEmail;