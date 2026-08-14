import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


const router = express.Router()
dotenv.config()

const generateResetToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
}
// const app = express();
// app.use(cors());
// Request password reset route
// router.post('/request-password-reset',
export const resetPassword = async (req, res) => {
  try {

    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const token = generateResetToken(user)
    const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');
    const resetLink = `${frontendUrl}/ResetPassword?token=${token}&UserId=${user._id}`


    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: process.env.PORT_EMAIL,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send reset email 
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    })

    res
      .status(200)
      .json({ message: 'Password reset email sent. Please check your inbox.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// router.post('/reset-password'
export const changePassword = async (req, res) => {

  const { token, newPassword } = req.body
  if (!token) return res.status(400).json({ message: 'Token is required' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    // Update password
    user.password = newPassword
    await user.save()

    res.status(200).json({ message: 'Password has been reset successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' })
  }
}


export const updatePassword = async (req, res) => {
  const { userId, token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ success: false, message: "Token and new password are required." });
  }

  try {
    // Verify reset token cryptographically
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'smart_engine_default_secret_key_123_change_this_in_production');
    const targetId = userId || decoded.id || decoded.userId;

    const user = await User.findById(targetId);
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid token or user not found." });
    }

    // Update password safely via model instance to trigger hashing/saving
    user.password = password;
    await user.save();

    console.log("Password updated securely for user:", targetId);
    res.json({ success: true, message: "Password updated successfully!" });
  } catch (err) {
    console.error("Reset Password Error:", err.message);
    res.status(400).json({ success: false, message: "Invalid or expired reset token." });
  }
};