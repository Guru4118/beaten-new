const express = require('express');
const { body } = require('express-validator');
const {
  register,
  sendOTP,
  verifyOTP,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  refreshToken
} = require('../controllers/authController');
const { protect, loginLimiter } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please enter a valid 10-digit phone number starting with 6-9'),
  
  body('dob')
    .isISO8601()
    .withMessage('Please enter a valid date of birth'),
  
  body('gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other')
];

const validateLogin = [
  body(['emailOrPhone', 'email'])
    .custom((value, { req }) => {
      if (!req.body.emailOrPhone && !req.body.email) {
        throw new Error('Email or phone number is required');
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validateSendOTP = [
  body('emailOrPhone')
    .notEmpty()
    .withMessage('Email or phone number is required')
    .custom((value) => {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isPhone = /^[6-9]\d{9}$/.test(value);
      
      if (!isEmail && !isPhone) {
        throw new Error('Please enter a valid email address or phone number');
      }
      return true;
    })
];

const validateVerifyOTP = [
  body('emailOrPhone')
    .notEmpty()
    .withMessage('Email or phone number is required'),
  
  body('otp')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits')
    .isNumeric()
    .withMessage('OTP must contain only numbers')
];

const validateForgotPassword = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address')
];

const validateResetPassword = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const validateRefreshToken = [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required')
];

// Routes
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegister, register);

// @route   POST /api/auth/send-otp
// @desc    Send OTP for login
// @access  Public
router.post('/send-otp', validateSendOTP, sendOTP);

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and login
// @access  Public
router.post('/verify-otp', validateVerifyOTP, verifyOTP);

// @route   POST /api/auth/login
// @desc    Login with email/phone and password
// @access  Public
router.post('/login', validateLogin, login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, getMe);

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', validateForgotPassword, forgotPassword);

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password with token
// @access  Public
router.post('/reset-password/:token', validateResetPassword, resetPassword);

// @route   POST /api/auth/refresh
// @desc    Refresh access token
// @access  Public
router.post('/refresh', validateRefreshToken, refreshToken);

module.exports = router; 