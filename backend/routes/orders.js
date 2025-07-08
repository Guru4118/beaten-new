const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Correct path
const authMiddleware = require('../middleware/auth'); // Correct path

// Apply authentication middleware to all order routes
router.use(authMiddleware.protect);

// Create new order
router.post('/create', orderController.createOrder);

// Verify payment
router.post('/verify-payment', orderController.verifyPayment);

// Get user's own orders (specific route — must come first)
router.get('/my-orders', orderController.getOrders);  // <--- 🔥 FIX HERE



// Get order by ID
router.get('/:id', orderController.getOrderById);

// Request return
router.post('/:id/return', orderController.returnOrder);

// Get invoice
router.get('/:id/invoice', orderController.getOrderInvoice);

module.exports = router;