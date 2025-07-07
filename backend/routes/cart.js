const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/cartController');

// GET /api/cart
router.get('/', getCart);

// POST /api/cart
router.post('/', addToCart);

// PUT /api/cart/:productId
router.put('/:productId', updateCartItem);

// DELETE /api/cart/:productId
router.delete('/:productId', removeFromCart);

// DELETE /api/cart
router.delete('/', clearCart);

module.exports = router; 