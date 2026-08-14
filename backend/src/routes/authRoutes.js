import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  checkEmail,
  logout,
  googleLogin
} from '../controllers/authController.js';
import {
  validateRegistration,
  validateLogin,
  checkValidation
} from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';
import { sendWelcomeEmail } from './mail/emailService.js';
import userSchema from '../models/User.js';
import { } from '../controllers/authController.js';
// import { PasswordReset } from '../routes/passwordReset.js';
import { resetPassword, changePassword, updatePassword } from '../controllers/resetPassword.js';
import { matchResume } from '../controllers/resumeController.js';


const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register',
  authLimiter,
  validateRegistration,
  checkValidation,
  register
);

router.post('/google', googleLogin);

router.post('/login',
  authLimiter,
  validateLogin,
  checkValidation,
  login
);

router.post('/request-password-reset', resetPassword);
router.post('/reset-password', changePassword);
router.post('/update-password', updatePassword);
router.get('/check-email', checkEmail);


router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.post('/logout', authenticateToken, logout);
router.post('/match-resume', matchResume);

export default router;
