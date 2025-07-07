const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  emailOrPhone: {
    type: String,
    required: [true, 'Email or phone is required'],
    trim: true
  },
  otp: {
    type: String,
    required: [true, 'OTP is required'],
    length: [6, 'OTP must be 6 digits']
  },
  type: {
    type: String,
    enum: ['login', 'email_verification', 'phone_verification', 'password_reset'],
    required: [true, 'OTP type is required']
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  attempts: {
    type: Number,
    default: 0
  },
  maxAttempts: {
    type: Number,
    default: 3
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 } // Auto-delete expired documents
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // Auto-delete after 5 minutes
  }
}, {
  timestamps: true
});

// Index for better query performance
otpSchema.index({ emailOrPhone: 1, type: 1 });
otpSchema.index({ expiresAt: 1 });

// Generate OTP
otpSchema.statics.generateOTP = function() {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create OTP for email/phone
otpSchema.statics.createOTP = async function(emailOrPhone, type) {
  // Delete any existing OTPs for this email/phone and type
  await this.deleteMany({ emailOrPhone, type });
  
  // Generate new OTP
  const otp = this.generateOTP();
  
  // Set expiration time (5 minutes from now)
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  
  // Create and save OTP
  const otpDoc = await this.create({
    emailOrPhone,
    otp,
    type,
    expiresAt
  });
  
  return otpDoc;
};

// Verify OTP
otpSchema.statics.verifyOTP = async function(emailOrPhone, otp, type) {
  const otpDoc = await this.findOne({
    emailOrPhone,
    type,
    isUsed: false,
    expiresAt: { $gt: new Date() }
  });
  
  if (!otpDoc) {
    return { valid: false, message: 'OTP not found or expired' };
  }
  
  // Check if max attempts exceeded
  if (otpDoc.attempts >= otpDoc.maxAttempts) {
    await otpDoc.deleteOne();
    return { valid: false, message: 'Maximum attempts exceeded. Please request a new OTP.' };
  }
  
  // Increment attempts
  otpDoc.attempts += 1;
  
  // Check if OTP matches
  if (otpDoc.otp !== otp) {
    await otpDoc.save();
    return { valid: false, message: 'Invalid OTP' };
  }
  
  // Mark OTP as used
  otpDoc.isUsed = true;
  await otpDoc.save();
  
  return { valid: true, message: 'OTP verified successfully' };
};

// Check if OTP exists and is valid
otpSchema.statics.isValidOTP = async function(emailOrPhone, type) {
  const otpDoc = await this.findOne({
    emailOrPhone,
    type,
    isUsed: false,
    expiresAt: { $gt: new Date() }
  });
  
  return !!otpDoc;
};

// Get OTP count for rate limiting
otpSchema.statics.getOTPCount = async function(emailOrPhone, type, timeWindow = 15 * 60 * 1000) {
  const cutoffTime = new Date(Date.now() - timeWindow);
  
  const count = await this.countDocuments({
    emailOrPhone,
    type,
    createdAt: { $gte: cutoffTime }
  });
  
  return count;
};

// Clean up expired OTPs
otpSchema.statics.cleanupExpired = async function() {
  const result = await this.deleteMany({
    expiresAt: { $lt: new Date() }
  });
  
  return result.deletedCount;
};

module.exports = mongoose.model('OTP', otpSchema); 