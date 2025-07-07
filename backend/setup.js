#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

console.log('🚀 BEATEN Backend Setup Script');
console.log('==============================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from env.example...');
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created successfully!');
    console.log('⚠️  Please edit .env file with your configuration before starting the server.\n');
  } else {
    console.log('❌ env.example file not found!');
    process.exit(1);
  }
} else {
  console.log('✅ .env file already exists.\n');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ Dependencies installed successfully!\n');
  } catch (error) {
    console.log('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed.\n');
}

// Check MongoDB connection
console.log('🔍 Checking MongoDB connection...');
try {
  // Load environment variables
  require('dotenv').config();
  
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beaten_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('✅ MongoDB connection successful!');
    mongoose.connection.close();
  }).catch((error) => {
    console.log('❌ MongoDB connection failed:', error.message);
    console.log('💡 Make sure MongoDB is running and MONGODB_URI is correct in .env file.\n');
  });
} catch (error) {
  console.log('❌ Error checking MongoDB connection:', error.message);
}

const sampleProducts = [
  {
    name: 'Classic White T-Shirt',
    description: 'Premium cotton classic white t-shirt',
    price: 29.99,
    category: 'T-shirts',
    subCategory: 'Basic',
    collection: 'Summer Collection',
    inStock: true,
    colors: ['White'],
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    discount: 0,
    featured: true,
    sku: 'TSH-001',
    stock: 100,
    status: 'In Stock',
    rating: 4.5,
    reviews: 25
  },
  {
    name: 'Denim Jacket',
    description: 'Vintage style denim jacket',
    price: 89.99,
    category: 'Jackets',
    subCategory: 'Denim',
    collection: 'Fall Collection',
    inStock: true,
    colors: ['Blue'],
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    discount: 10,
    featured: false,
    sku: 'JKT-001',
    stock: 50,
    status: 'In Stock',
    rating: 4.2,
    reviews: 18
  },
  {
    name: 'Cargo Pants',
    description: 'Comfortable cargo pants with multiple pockets',
    price: 59.99,
    category: 'Bottom Wear',
    subCategory: 'Pants',
    collection: 'Casual Collection',
    inStock: true,
    colors: ['Khaki', 'Black'],
    gender: 'Men',
    sizes: ['30', '32', '34', '36'],
    discount: 0,
    featured: false,
    sku: 'CRG-001',
    stock: 75,
    status: 'In Stock',
    rating: 4.0,
    reviews: 12
  }
];

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Created ${createdProducts.length} sample products`);

    // Display the created products with their IDs
    createdProducts.forEach(product => {
      console.log(`Product: ${product.name} - ID: ${product._id}`);
    });

    console.log('Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Setup error:', error);
    process.exit(1);
  }
};

setupDatabase();

console.log('\n📋 Setup Complete!');
console.log('==================');
console.log('Next steps:');
console.log('1. Edit .env file with your configuration');
console.log('2. Start the server: npm run dev');
console.log('3. Test the API: http://localhost:5000/health');
console.log('4. Import Postman collection for testing\n');

console.log('🔗 Useful URLs:');
console.log('- Health Check: http://localhost:5000/health');
console.log('- API Base: http://localhost:5000/api');
console.log('- Auth Endpoints: http://localhost:5000/api/auth\n');

console.log('📚 Documentation:');
console.log('- Backend README: README.md');
console.log('- Postman Collection: BEATEN_API_Postman_Collection.json\n'); 