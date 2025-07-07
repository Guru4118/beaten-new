const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['coupon', 'scratch'], required: true },
  discount: { type: Number, required: true },
  minPurchase: { type: Number },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  usageLimit: { type: Number, required: true },
  usedCount: { type: Number, default: 0 },
  status: { type: String, default: 'active' }
});

module.exports = mongoose.model('Promotion', promotionSchema);
