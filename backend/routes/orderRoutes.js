const express = require('express');
const orderController = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', protect, orderController.createOrder);
router.post('/verify-payment', protect, orderController.verifyPayment);
router.get('/', protect, orderController.getOrders);
router.get('/:id', protect, orderController.getOrderById);
router.post('/:id/return', protect, orderController.returnOrder);
router.get('/:id/invoice', protect, orderController.getOrderInvoice);

module.exports = router;