const Promotion = require('../models/Promotion');

// @desc    Create multiple promotion codes
// @route   POST /api/promotions/create
// @access  Public or Protected (you can add auth middleware if needed)
const createPromotions = async (req, res) => {
  const { codes } = req.body;
  try {
    const saved = await Promotion.insertMany(codes);
    res.status(201).json({ message: 'Codes saved successfully', saved });
  } catch (err) {
    console.error('Error creating promotions:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all promotion codes
// @route   GET /api/promotions
// @access  Public
const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find().sort({ validUntil: -1 });
    res.status(200).json(promotions);
  } catch (err) {
    console.error('Error fetching promotions:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Export both handlers
module.exports = {
  createPromotions,
  getAllPromotions,
};
