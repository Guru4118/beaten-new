const express = require('express');
const mongoose = require('mongoose'); // Import mongoose for ID validation
const {
  getAdminOrders,
  updateOrderStatus,
  getOrderStats
} = require('../controllers/orderControllerAdmin');

const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// ✅ 1. Reorganized routes - static paths first
router.route('/admin/stats').get(protect, admin, getOrderStats);
router.route('/admin').get(protect, admin, getAdminOrders);

// ✅ 2. Add ObjectID validation middleware
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  next();
};

// ✅ 3. Parameterized routes last with validation
router.route('/admin/:id')
  .put(validateObjectId, protect, admin, updateOrderStatus);

module.exports = router;