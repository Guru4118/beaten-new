// Export all services
export { default as authService } from './authService';

// Export API modules
export {
  authAPI,
  userAPI,
  addressAPI,
  cartAPI,
  productsAPI,
  ordersAPI,
  premiumAPI,
  wishlistAPI,
  collectionsAPI,
  searchAPI,
  uploadAPI,
  paymentAPI,
  notificationAPI,
  couponAPI,
  analyticsAPI,
  handleAPIError,
  handleAPISuccess,
} from '../api';

// Default API instance
export { default as api } from '../api'; 