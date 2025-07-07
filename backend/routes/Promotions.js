const express = require('express');
const router = express.Router();
const { createPromotions } = require('../controllers/promotionController');

// POST /api/promotions/create
router.post('/create', createPromotions);
// ✅ GET /api/promotions
router.get('/', getAllPromotions);

module.exports = router;
