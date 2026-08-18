import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const cleanEnvStr = (str) => (str || '').replace(/\s+/g, '').replace(/^["']|["']$/g, '');

const sendEmail = async (options) => {
    try {
        const emailUser = (process.env.EMAIL_USER || '').trim().replace(/^["']|["']$/g, '');
        const emailPass = cleanEnvStr(process.env.EMAIL_PASS);

        if (!emailUser || !emailPass) {
            console.log(`\n=================== [EMAIL DISPATCHED TO JOBSEEKER] ===================`);
            console.log(`To: ${options.email}`);
            console.log(`Subject: ${options.subject}`);
            console.log(`Status: EMAIL_USER / EMAIL_PASS missing in backend/.env — Simulated Send Successful.`);
            console.log(`=======================================================================\n`);
            return;
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 15000,
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        const mailOptions = {
            from: `"VEYRA AI" <${emailUser}>`,
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