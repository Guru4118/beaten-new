const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts
} = require('../controllers/productController');

// GET /api/products
router.get('/', getProducts);

// POST /api/products
router.post('/', createProduct);

// POST /api/products/bulk-delete (must come before /:id routes)
router.post('/bulk-delete', bulkDeleteProducts);

// GET /api/products/test - Test endpoint to see what products exist
router.get('/test/ids', async (req, res) => {
  try {
    const Product = require('../models/Product');
    const products = await Product.find({}).limit(5);
    const productIds = products.map(p => ({ id: p._id.toString(), name: p.name }));
    
    res.json({
      status: 'success',
      message: 'Sample product IDs for testing',
      products: productIds,
      totalProducts: products.length,
      exampleRequest: {
        method: 'POST',
        url: '/api/products/bulk-delete',
        body: { ids: productIds.map(p => p.id) }
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// GET /api/products/:id
router.get('/:id', getProductById);

// PUT /api/products/:id
router.put('/:id', updateProduct);

// DELETE /api/products/:id
router.delete('/:id', deleteProduct);

module.exports = router;
 