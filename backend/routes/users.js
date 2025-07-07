const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  getSavedCards,
  addSavedCard,
  deleteSavedCard,
  getMembership,
  uploadAvatar
} = require('../controllers/userController');

// Profile routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.delete('/account', protect, deleteAccount);

// Address routes
router.get('/addresses', protect, getAddresses);
router.post('/addresses', protect, addAddress);
router.put('/addresses/:id', protect, updateAddress);
router.delete('/addresses/:id', protect, deleteAddress);

// Saved cards routes
router.get('/saved-cards', protect, getSavedCards);
router.post('/saved-cards', protect, addSavedCard);
router.delete('/saved-cards/:id', protect, deleteSavedCard);

// Membership routes
router.get('/membership', protect, getMembership);

// Avatar routes
router.post('/avatar', protect, uploadAvatar);

module.exports = router; 