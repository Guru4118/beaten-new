const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  size: String,
  color: String,
  price: {
    type: Number,
    required: true
  }
});

const shippingAddressSchema = new mongoose.Schema({
  fullName: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  phone: String
});
const statusHistorySchema = new mongoose.Schema({
  status: String,
  timestamp: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  shippingAddress: shippingAddressSchema,
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'cod'],
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  shippingFee: {
    type: Number,
    default: 0
  },
  codCharge: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending'
  },
   orderNumber: {
    type: String,
    unique: true,
    default: () => `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`
  },
  statusHistory: [statusHistorySchema],
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;