const express = require('express');
const mongoose = require('mongoose');
const {
  getAdminOrders,
  updateOrderStatus,
  getOrderStats
} = require('../controllers/orderControllerAdmin');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// ✅ 1. Unified admin route prefix
router.use(protect, admin); // Apply auth to all admin routes

// ✅ 2. Fixed route definitions
router.get('/stats', getOrderStats);
router.get('/', getAdminOrders); // Now handles /api/orders/admin

// ✅ 3. Enhanced ID validation middleware
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  next();
};

// ✅ 4. Isolated ID-based routes
router.route('/:id')
  .put(validateObjectId, updateOrderStatus);

module.exports = router;