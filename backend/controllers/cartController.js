// backend/controllers/cartController.js

// Dummy in-memory cart (per server, not per user)
let cart = [];

// GET /api/cart
const getCart = (req, res) => {
  res.json(cart);
};

// POST /api/cart
const addToCart = (req, res) => {
  const { productId, quantity, size, color } = req.body;
  // Check if item already exists
  const existing = cart.find(
    item => item.productId === productId && item.size === size && item.color === color
  );
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity, size, color });
  }
  res.json({ status: 'success', cart });
};

// PUT /api/cart/:productId
const updateCartItem = (req, res) => {
  const { productId } = req.params;
  const { quantity, size, color } = req.body;
  const item = cart.find(
    item => item.productId === productId && item.size === size && item.color === color
  );
  if (item) {
    item.quantity = quantity;
    res.json({ status: 'success', cart });
  } else {
    res.status(404).json({ status: 'error', message: 'Item not found in cart' });
  }
};

// DELETE /api/cart/:productId
const removeFromCart = (req, res) => {
  const { productId } = req.params;
  const { size, color } = req.body;

  if (size && color) {
    // Remove only the matching variant
    cart = cart.filter(
      item => !(item.productId === productId && item.size === size && item.color === color)
    );
  } else {
    // Remove all items with the given productId
    cart = cart.filter(item => item.productId !== productId);
  }

  res.json({ status: 'success', cart });
};

// DELETE /api/cart
const clearCart = (req, res) => {
  cart = [];
  res.json({ status: 'success', cart });
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart }; 