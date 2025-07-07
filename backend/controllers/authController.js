const User = require('../models/User');
const OTP = require('../models/OTP');
const emailService = require('../utils/emailService');
const smsService = require('../utils/smsService');
const { validationResult } = require('express-validator');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, password, phone, dob, gender } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: existingUser.email === email ? 'Email already registered' : 'Phone number already registered'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      dob: new Date(dob),
      gender
    });

    // Generate token
    const token = user.getSignedJwtToken();

    // Send welcome email (async, don't wait)
    emailService.sendWelcomeEmail(email, name).catch(console.error);

    // Send welcome SMS (async, don't wait)
    smsService.sendWelcomeSMS(phone, name).catch(console.error);

    res.status(201).json({
      status: 'success',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dob: user.dob,
        isPremium: user.isPremium,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Registration failed'
    });
  }
};

// @desc    Send OTP for login
// @route   POST /api/auth/send-otp
// @access  Public
const sendOTP = async (req, res) => {
  try {
    const { emailOrPhone } = req.body;

    if (!emailOrPhone) {
      return res.status(400).json({
        status: 'error',
        message: 'Email or phone number is required'
      });
    }

    // Check if user exists
    const user = await User.findOne({
      $or: [
        { email: emailOrPhone },
        { phone: emailOrPhone }
      ]
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found with this email or phone number'
      });
    }

    // Check if account is blocked
    if (user.status === 'blocked') {
      return res.status(403).json({
        status: 'error',
        message: 'Account is blocked. Please contact support.'
      });
    }

    // Create OTP
    const otpDoc = await OTP.createOTP(emailOrPhone, 'login');

    // Send OTP via email or SMS
    let sendResult;
    if (emailOrPhone.includes('@')) {
      // Send via email
      sendResult = await emailService.sendOTPEmail(emailOrPhone, otpDoc.otp, 'login');
    } else {
      // Send via SMS
      const formattedPhone = smsService.validatePhoneNumber(emailOrPhone);
      if (!formattedPhone) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid phone number format'
        });
      }
      sendResult = await smsService.sendOTPSMS(formattedPhone, otpDoc.otp, 'login');
    }

    if (!sendResult.success) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to send OTP. Please try again.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'OTP sent successfully',
      emailOrPhone: emailOrPhone.includes('@') ? emailOrPhone : undefined,
      phone: emailOrPhone.includes('@') ? undefined : emailOrPhone
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to send OTP'
    });
  }
};

// @desc    Verify OTP and login
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
  try {
    const { emailOrPhone, otp } = req.body;

    if (!emailOrPhone || !otp) {
      return res.status(400).json({
        status: 'error',
        message: 'Email/phone and OTP are required'
      });
    }

    // Check if user exists
    const user = await User.findOne({
      $or: [
        { email: emailOrPhone },
        { phone: emailOrPhone }
      ]
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Check if account is blocked
    if (user.status === 'blocked') {
      return res.status(403).json({
        status: 'error',
        message: 'Account is blocked. Please contact support.'
      });
    }

    // Verify OTP
    const otpResult = await OTP.verifyOTP(emailOrPhone, otp, 'login');

    if (!otpResult.valid) {
      return res.status(400).json({
        status: 'error',
        message: otpResult.message
      });
    }

    // Update last login
    await user.updateLastLogin();

    // Generate token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dob: user.dob,
        isPremium: user.isPremium,
        premiumExpiry: user.premiumExpiry,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Login failed'
    });
  }
};

// @desc    Login user with password
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    // Accept both 'emailOrPhone' and 'email' as identifier
    const identifier = req.body.emailOrPhone || req.body.email;
    const { password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email/phone and password are required'
      });
    }

    // Find user and include password for comparison
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phone: identifier }
      ]
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Check if account is blocked
    if (user.status === 'blocked') {
      return res.status(403).json({
        status: 'error',
        message: 'Account is blocked. Please contact support.'
      });
    }

    // Check if account is locked (skip for admin)
    if (user.role !== 'admin') {
      const loginCheck = user.canLogin();
      if (!loginCheck.canLogin) {
        return res.status(403).json({
          status: 'error',
          message: loginCheck.reason
        });
      }
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      // Increment login attempts (skip for admin)
      if (user.role !== 'admin') {
        await user.incLoginAttempts();
      }
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login (skip for admin)
    if (user.role !== 'admin') {
      await user.resetLoginAttempts();
    }

    // Update last login
    await user.updateLastLogin();

    // Generate token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dob: user.dob,
        isPremium: user.isPremium,
        premiumExpiry: user.premiumExpiry,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Login failed'
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('addresses')
      .select('-password');

    res.status(200).json({
      status: 'success',
      user
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get user data'
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found with this email'
      });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save();

    // Send reset email
    const emailResult = await emailService.sendPasswordResetEmail(email, resetToken);

    if (!emailResult.success) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to send password reset email'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Password reset email sent'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process password reset request'
    });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        status: 'error',
        message: 'Password is required'
      });
    }

    // Hash token
    const resetPasswordToken = require('crypto')
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or expired reset token'
      });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password reset successful'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to reset password'
    });
  }
};

// @desc    Refresh token
// @route   POST /api/auth/refresh
// @access  Public
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        status: 'error',
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Get user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid refresh token'
      });
    }

    // Generate new access token
    const newToken = user.getSignedJwtToken();

    res.status(200).json({
      status: 'success',
      token: newToken
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      status: 'error',
      message: 'Invalid refresh token'
    });
  }
};

module.exports = {
  register,
  sendOTP,
  verifyOTP,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  refreshToken
}; 