const User = require('../models/User');
const Address = require('../models/Address');
const SavedCard = require('../models/SavedCard');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('addresses')
      .select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get profile'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, gender, dob, phone, email } = req.body;

    // Check if email is being changed and if it's already taken
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'Email is already registered'
        });
      }
    }

    // Check if phone is being changed and if it's already taken
    if (phone && phone !== req.user.phone) {
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'Phone number is already registered'
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || req.user.name,
        gender: gender || req.user.gender,
        dob: dob || req.user.dob,
        phone: phone || req.user.phone,
        email: email || req.user.email
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update profile'
    });
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Current password and new password are required'
      });
    }

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Check current password
    const isPasswordCorrect = await user.comparePassword(currentPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to change password'
    });
  }
};

// @desc    Delete account
// @route   DELETE /api/users/account
// @access  Private
const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        status: 'error',
        message: 'Password is required to delete account'
      });
    }

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Verify password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: 'error',
        message: 'Password is incorrect'
      });
    }

    // Delete user's addresses
    await Address.deleteMany({ user: req.user._id });

    // Delete user's saved cards
    await SavedCard.deleteMany({ user: req.user._id });

    // Delete user
    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      status: 'success',
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete account'
    });
  }
};

// @desc    Get user addresses
// @route   GET /api/users/addresses
// @access  Private
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ 
      user: req.user._id, 
      isActive: true 
    }).sort({ isDefault: -1, createdAt: -1 });

    res.status(200).json({
      status: 'success',
      data: addresses
    });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get addresses'
    });
  }
};

// @desc    Add address
// @route   POST /api/users/addresses
// @access  Private
const addAddress = async (req, res) => {
  try {
    // Required fields
    const {
      fullName,
      phone,
      addressLine1,
      city,
      state,
      pincode
    } = req.body;

    if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
      return res.status(400).json({
        status: 'error',
        message: 'All required fields must be provided.'
      });
    }

    // Use defaults for label and country if not provided
    const addressData = {
      user: req.user._id,
      label: req.body.label || 'Home',
      fullName,
      phone,
      addressLine1,
      addressLine2: req.body.addressLine2 || '',
      city,
      state,
      pincode,
      country: req.body.country || 'India',
      isDefault: req.body.isDefault || false
    };

    const address = await Address.create(addressData);

    res.status(201).json({
      status: 'success',
      message: 'Address added successfully',
      data: address
    });
  } catch (error) {
    console.error('Add address error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to add address'
    });
  }
};

// @desc    Update address
// @route   PUT /api/users/addresses/:id
// @access  Private
const updateAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!address) {
      return res.status(404).json({
        status: 'error',
        message: 'Address not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Address updated successfully',
      data: address
    });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update address'
    });
  }
};

// @desc    Delete address
// @route   DELETE /api/users/addresses/:id
// @access  Private
const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!address) {
      return res.status(404).json({
        status: 'error',
        message: 'Address not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Address deleted successfully'
    });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete address'
    });
  }
};

// @desc    Get saved cards
// @route   GET /api/users/saved-cards
// @access  Private
const getSavedCards = async (req, res) => {
  try {
    const cards = await SavedCard.find({ 
      user: req.user._id, 
      isActive: true 
    }).sort({ isDefault: -1, createdAt: -1 });

    res.status(200).json({
      status: 'success',
      data: cards
    });
  } catch (error) {
    console.error('Get saved cards error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get saved cards'
    });
  }
};

// @desc    Add saved card
// @route   POST /api/users/saved-cards
// @access  Private
const addSavedCard = async (req, res) => {
  try {
    const cardData = {
      ...req.body,
      user: req.user._id
    };

    const card = await SavedCard.create(cardData);

    res.status(201).json({
      status: 'success',
      message: 'Card saved successfully',
      data: card
    });
  } catch (error) {
    console.error('Add saved card error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to save card'
    });
  }
};

// @desc    Delete saved card
// @route   DELETE /api/users/saved-cards/:id
// @access  Private
const deleteSavedCard = async (req, res) => {
  try {
    const card = await SavedCard.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!card) {
      return res.status(404).json({
        status: 'error',
        message: 'Card not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Card deleted successfully'
    });
  } catch (error) {
    console.error('Delete saved card error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete card'
    });
  }
};

// @desc    Get membership info
// @route   GET /api/users/membership
// @access  Private
const getMembership = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('isPremium premiumExpiry');

    const membership = {
      isPremium: user.isPremium,
      daysLeft: 0,
      amountSaved: 0
    };

    if (user.isPremium && user.premiumExpiry) {
      const now = new Date();
      const expiry = new Date(user.premiumExpiry);
      const daysLeft = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
      
      membership.daysLeft = daysLeft > 0 ? daysLeft : 0;
      membership.amountSaved = 1200; // Mock data - calculate based on actual savings
    }

    res.status(200).json({
      status: 'success',
      data: membership
    });
  } catch (error) {
    console.error('Get membership error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get membership info'
    });
  }
};

// @desc    Upload avatar
// @route   POST /api/users/avatar
// @access  Private
const uploadAvatar = async (req, res) => {
  try {
    // This would typically use multer or similar for file upload
    // For now, we'll assume the file URL is passed in the request
    const { avatarUrl } = req.body;

    if (!avatarUrl) {
      return res.status(400).json({
        status: 'error',
        message: 'Avatar URL is required'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarUrl },
      { new: true }
    ).select('-password');

    res.status(200).json({
      status: 'success',
      message: 'Avatar updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload avatar'
    });
  }
};

module.exports = {
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
}; 