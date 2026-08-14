import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { sendError } from '../utils/responseHandler.js';

export const validateRegistration = [
  body('username')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Username must be between 2 and 30 characters')
    // .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Username can only contain letters and spaces'),

  // body('lastName')
  //   .trim()
  //   .isLength({ min: 2, max: 30 })
  //   .withMessage('Last name must be between 2 and 30 characters')
  //   .matches(/^[a-zA-Z\s]+$/)
  //   .withMessage('Last name can only contain letters and spaces'),

  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .custom(async (email) => {
      const emailStr = String(email || '').toLowerCase().trim();
      if (!emailStr) return true;
      const existingUser = await User.findOne({ email: emailStr });
      if (existingUser) {
        throw new Error('Email already exists. Please use a different email.');
      }
      return true;
    }),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/)
    .withMessage('Password must contain at least one letter, one number, and one special character'),

  body('userType')
    .isIn(['Job Seeker', 'Recruiter'])
    .withMessage('User type must be either Job Seeker or Recruiter')
];

export const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const validateJobSeekerProfile = [
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be 10 digits'),

  body('summary')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Summary cannot exceed 1000 characters'),

  body('skills.*.skillName')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Skill name is required'),

  body('skills.*.proficiencyLevel')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced', 'expert'])
    .withMessage('Invalid proficiency level')
];

export const validateRecruiterProfile = [
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[0-9+\-\s()]{10,20}$/)
    .withMessage('Phone number must be valid (10-20 chars)'),

  body('company.name')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2 })
    .withMessage('Company name is required'),

  body('company.industry')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2 })
    .withMessage('Industry is required'),

  body('company.size')
    .optional({ checkFalsy: true })
    .isIn(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'])
    .withMessage('Invalid company size'),

  body('position')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2 })
    .withMessage('Position is required')
];

export const validateAdminProfile = [
  body('phone')
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be 10 digits'),

  body('role')
    .isIn(['super-admin', 'admin', 'moderator', 'organiser'])
    .withMessage('Invalid admin role'),

  body('department')
    .isIn(['operations', 'hr', 'tech', 'marketing', 'finance', 'support'])
    .withMessage('Invalid department')
];

export const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));

    console.error("Middleware Validation Failed:", JSON.stringify(errorMessages, null, 2));

    return sendError(res, 'Validation failed', errorMessages, 422);
  }

  next();
};
