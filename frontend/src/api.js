import axios from 'axios';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // Register new user
  register: (userData) => api.post('/auth/register', userData),
  
  // Login user (supports both traditional and OTP-based login)
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Send OTP for login
  sendOtp: (emailOrPhone) => api.post('/auth/send-otp', { emailOrPhone }),
  
  // Verify OTP for login
  verifyOtp: (emailOrPhone, otp) => api.post('/auth/verify-otp', { emailOrPhone, otp }),
  
  // Social login
  socialLogin: (provider, token) => api.post('/auth/social-login', { provider, token }),
  
  // Forgot password
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  
  // Reset password
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
  
  // Get current user
  getCurrentUser: () => api.get('/auth/me'),
};

// User Management API
export const userAPI = {
  // Update profile
  updateProfile: (userData) => api.put('/users/profile', userData),
  
  // Change password
  changePassword: (passwords) => api.put('/users/change-password', passwords),
  
  // Get user profile
  getProfile: () => api.get('/users/profile'),
  
  // Delete account
  deleteAccount: () => api.delete('/users/account'),
  
  // Get user addresses
  getAddresses: () => api.get('/users/addresses'),
  
  // Add address
  addAddress: (addressData) => api.post('/users/addresses', addressData),
  
  // Update address
  updateAddress: (addressId, addressData) => api.put(`/users/addresses/${addressId}`, addressData),
  
  // Delete address
  deleteAddress: (addressId) => api.delete(`/users/addresses/${addressId}`),
  
  // Get saved cards
  getSavedCards: () => api.get('/users/saved-cards'),
  
  // Add saved card
  addSavedCard: (cardData) => api.post('/users/saved-cards', cardData),
  
  // Delete saved card
  deleteSavedCard: (cardId) => api.delete(`/users/saved-cards/${cardId}`),
  
  // Get membership info
  getMembership: () => api.get('/users/membership'),
  
  // Upgrade to premium
  upgradeToPremium: (paymentData) => api.post('/users/premium/upgrade', paymentData),
  
  // Get user orders
  getOrders: () => api.get('/users/orders'),
  
  // Get user wishlist
  getWishlist: () => api.get('/users/wishlist'),
  
  // Upload avatar
  uploadAvatar: (formData) => api.post('/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  
  // Verify email
  verifyEmail: (token) => api.post('/users/verify-email', { token }),
  
  // Verify phone
  verifyPhone: (token) => api.post('/users/verify-phone', { token }),
  
  // Resend verification email
  resendEmailVerification: () => api.post('/users/resend-email-verification'),
  
  // Resend verification SMS
  resendPhoneVerification: () => api.post('/users/resend-phone-verification'),
};

// Address Management API
export const addressAPI = {
  // Get user addresses
  getAddresses: () => api.get('/user/addresses'),
  
  // Add new address
  addAddress: (addressData) => api.post('/user/addresses', addressData),
  
  // Update address
  updateAddress: (id, addressData) => api.put(`/user/addresses/${id}`, addressData),
  
  // Delete address
  deleteAddress: (id) => api.delete(`/user/addresses/${id}`),
};

// Cart Management API
export const cartAPI = {
  // Get cart
  getCart: () => api.get('/cart'),
  
  // Add to cart
  addToCart: (itemData) => api.post('/cart', itemData),
  
  // Update cart item
  updateCartItem: (productId, quantity, size, color) =>
    api.put(`/cart/${productId}`, { quantity, size, color }),
  
  // Remove from cart
  removeFromCart: (productId, size, color) =>
    api.delete(`/cart/${productId}`, { data: { size, color } }),
  
  // Clear cart
  clearCart: () => api.delete('/cart'),
};

// Products API
export const productsAPI = {
  // List products with filters
  getProducts: (params = {}) => {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        if (Array.isArray(params[key])) {
          params[key].forEach(value => queryParams.append(key, value));
        } else {
          queryParams.append(key, params[key]);
        }
      }
    });
    return api.get(`/products?${queryParams.toString()}`);
  },
  
  // Get product details
  getProduct: (id) => api.get(`/products/${id}`),
};

// Orders API
export const ordersAPI = {
  // Create order
  createOrder: (orderData) => api.post('/orders/create', orderData),
  
  // List user orders
  getOrders: () => api.get('/orders'),
  
  // Get order details
  getOrder: (orderId) => api.get(`/orders/${orderId}`),
  
  // Cancel order
  cancelOrder: (orderId) => api.post(`/orders/${orderId}/cancel`),
  
  // Get invoice for an order
  getOrderInvoice: (orderId) => api.get(`/orders/${orderId}/invoice`),
};

// Premium Membership API
export const premiumAPI = {
  // Get plans
  getPlans: () => api.get('/premium/plans'),
  
  // Subscribe to plan
  subscribe: (planId) => api.post('/premium/subscribe', { planId }),
};

// Wishlist API (if available)
export const wishlistAPI = {
  // Get wishlist
  getWishlist: () => api.get('/wishlist'),
  
  // Add to wishlist
  addToWishlist: (productId) => api.post('/wishlist', { productId }),
  
  // Remove from wishlist
  removeFromWishlist: (productId) => api.delete(`/wishlist/${productId}`),
};

// Collections API
export const collectionsAPI = {
  // Get collections
  getCollections: () => api.get('/collections'),
  
  // Get collection products
  getCollectionProducts: (collectionId) => api.get(`/collections/${collectionId}/products`),
};

// Search API
export const searchAPI = {
  // Search products
  searchProducts: (query, params = {}) => {
    const searchParams = new URLSearchParams({ q: query, ...params });
    return api.get(`/search?${searchParams.toString()}`);
  },
};

// File Upload API
export const uploadAPI = {
  // Upload image
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Upload multiple images
  uploadImages: (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    return api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Payment API
export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: (orderData) => api.post('/payment/create-intent', orderData),
  
  // Verify payment
  verifyPayment: (paymentData) => api.post('/payment/verify', paymentData),
  
  // Get payment methods
  getPaymentMethods: () => api.get('/payment/methods'),
};

// Notification API
export const notificationAPI = {
  // Get notifications
  getNotifications: () => api.get('/notifications'),
  
  // Mark as read
  markAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`),
  
  // Mark all as read
  markAllAsRead: () => api.put('/notifications/read-all'),
  
  // Delete notification
  deleteNotification: (notificationId) => api.delete(`/notifications/${notificationId}`),
};

// Coupon API
export const couponAPI = {
  // Validate coupon
  validateCoupon: (code) => api.post('/coupons/validate', { code }),
  
  // Get available coupons
  getAvailableCoupons: () => api.get('/coupons/available'),
};

// Analytics API
export const analyticsAPI = {
  // Track page view
  trackPageView: (pageData) => api.post('/analytics/page-view', pageData),
  
  // Track event
  trackEvent: (eventData) => api.post('/analytics/event', eventData),
};

// Error handling utility
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      status,
      message: data?.message || 'An error occurred',
      details: data?.details || {},
    };
  } else if (error.request) {
    // Network error
    return {
      status: 0,
      message: 'Network error. Please check your connection.',
      details: {},
    };
  } else {
    // Other error
    return {
      status: 0,
      message: error.message || 'An unexpected error occurred',
      details: {},
    };
  }
};

// Success response utility
export const handleAPISuccess = (response) => {
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};

export default api; 