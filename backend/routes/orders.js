const express = require('express');
const router = express.Router();
const { getOrders, getOrderById, returnOrder, getOrderInvoice, createOrder, verifyPayment } = require('../controllers/orderController');

// GET /api/orders
router.get('/', getOrders);

// POST /api/orders/create
router.post('/create', createOrder);

// POST /api/orders/verify-payment
router.post('/verify-payment', verifyPayment);

// POST /api/orders/:id/return
router.post('/:id/return', returnOrder);

// GET /api/orders/:id/invoice
router.get('/:id/invoice', getOrderInvoice);

// GET /api/orders/:id
router.get('/:id', getOrderById);

module.exports = router; 