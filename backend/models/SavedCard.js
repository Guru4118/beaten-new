const mongoose = require('mongoose');

const savedCardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cardType: {
    type: String,
    required: [true, 'Card type is required'],
    enum: {
      values: ['visa', 'mastercard', 'amex', 'rupay', 'discover'],
      message: 'Card type must be visa, mastercard, amex, rupay, or discover'
    }
  },
  last4: {
    type: String,
    required: [true, 'Last 4 digits are required'],
    match: [/^\d{4}$/, 'Last 4 digits must be exactly 4 digits']
  },
  expiryMonth: {
    type: String,
    required: [true, 'Expiry month is required'],
    match: [/^(0[1-9]|1[0-2])$/, 'Expiry month must be between 01-12']
  },
  expiryYear: {
    type: String,
    required: [true, 'Expiry year is required'],
    match: [/^\d{4}$/, 'Expiry year must be 4 digits']
  },
  cardholderName: {
    type: String,
    required: [true, 'Cardholder name is required'],
    trim: true,
    maxlength: [50, 'Cardholder name cannot exceed 50 characters']
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Encrypted card token from payment gateway
  cardToken: {
    type: String,
    required: true
  },
  // Masked card number for display
  maskedCardNumber: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Ensure only one default card per user
savedCardSchema.pre('save', async function(next) {
  if (this.isDefault) {
    await this.constructor.updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { isDefault: false }
    );
  }
  next();
});

// Virtual for formatted expiry date
savedCardSchema.virtual('expiryDate').get(function() {
  return `${this.expiryMonth}/${this.expiryYear.slice(-2)}`;
});

// Virtual for card brand display
savedCardSchema.virtual('brand').get(function() {
  const brands = {
    visa: 'Visa',
    mastercard: 'Mastercard',
    amex: 'American Express',
    rupay: 'RuPay',
    discover: 'Discover'
  };
  return brands[this.cardType] || this.cardType;
});

// Index for better query performance
savedCardSchema.index({ user: 1 });
savedCardSchema.index({ user: 1, isDefault: 1 });
savedCardSchema.index({ user: 1, isActive: 1 });

module.exports = mongoose.model('SavedCard', savedCardSchema); 