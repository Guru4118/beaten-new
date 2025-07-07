import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Get all products
export const getProducts = (params) => axios.get(`${API_BASE_URL}/products`, { params });

// Get a single product by ID
export const getProductById = (id) => axios.get(`${API_BASE_URL}/products/${id}`);

// Create a new product
export const createProduct = (productData) => axios.post(`${API_BASE_URL}/products`, productData);

// Update a product by ID
export const updateProduct = (id, productData) => axios.put(`${API_BASE_URL}/products/${id}`, productData);

// Delete a product by ID
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/products/${id}`);

// Bulk delete products
export const bulkDeleteProducts = (ids) => axios.post(`${API_BASE_URL}/products/bulk-delete`, { ids }); 