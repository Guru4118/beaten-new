const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String, // ✅ stores uploaded image filename
  category: String,
  subCategory: String,
  collection: String,
  inStock: Boolean,
  colors: [String],
  gender: String,
  sizes: [String],
  discount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  sku: String,
  stock: Number,
  status: String,
  rating: Number,
  reviews: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
