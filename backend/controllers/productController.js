const Product = require('../models/Product');
const mongoose = require('mongoose');

// ✅ GET all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ✅ GET single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ CREATE new product with image
const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // ✅ Image filename from multer
    const image = req.file ? req.file.filename : '';

    const product = new Product({
      name,
      price,
      description,
      image, // Save image filename in MongoDB
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ✅ UPDATE product (excluding image)
const updateProduct = async (req, res) => {
  try {
    const { name, price, description,} = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      if (image) product.image = image;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ✅ DELETE product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ✅ BULK DELETE products
const bulkDeleteProducts = async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid or empty "ids" array',
    });
  }

  try {
    const validIds = ids.filter(id =>
      mongoose.Types.ObjectId.isValid(id)
    );

    if (validIds.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid ObjectIds provided.',
      });
    }

    const objectIds = validIds.map(id => new mongoose.Types.ObjectId(id));
    const result = await Product.deleteMany({ _id: { $in: objectIds } });

    res.json({
      status: 'success',
      message: `${result.deletedCount} product(s) deleted`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Bulk delete error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
};
 