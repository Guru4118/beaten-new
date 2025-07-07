# API Services Documentation

This directory contains the API services for the BEATEN e-commerce platform frontend.

## Files Structure

```
src/
├── api.js                 # Main API configuration and endpoints
├── services/
│   ├── authService.js     # Authentication service
│   ├── index.js          # Service exports
│   └── README.md         # This documentation
└── utils/
    └── apiUtils.js       # API utility functions
```

## Quick Start

### Import Services

```javascript
// Import all services
import { authService, productsAPI, cartAPI } from '../services';

// Or import specific APIs
import { authAPI, userAPI } from '../api';
```

### Basic Usage

```javascript
// Authentication
const loginResult = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get products
const products = await productsAPI.getProducts({
  category: 'shirts',
  gender: 'men',
  page: 1,
  limit: 20
});

// Add to cart
const cartItem = await cartAPI.addToCart({
  productId: 'product_id',
  quantity: 1,
  size: 'M',
  color: 'blue'
});
```

## API Configuration

### Environment Variables

Set the API base URL in your environment:

```bash
# .env
REACT_APP_API_URL=http://localhost:5000/api
```

### Default Configuration

- **Base URL**: `http://localhost:5000/api` (development)
- **Timeout**: 10 seconds
- **Content-Type**: `application/json`

## Authentication Service

The `authService` provides high-level authentication functions:

### Methods

#### `login(credentials)`
```javascript
const result = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});
```

#### `register(userData)`
```javascript
const result = await authService.register({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '9876543210',
  password: 'password123'
});
```

#### `logout()`
```javascript
authService.logout(); // Clears tokens and redirects to login
```

#### `isAuthenticated()`
```javascript
if (authService.isAuthenticated()) {
  // User is logged in
}
```

#### `isPremium()`
```javascript
if (authService.isPremium()) {
  // User has active premium membership
}
```

#### `getCurrentUser()`
```javascript
const user = await authService.getCurrentUser();
```

## API Modules

### Auth API (`authAPI`)
- `register(userData)` - Register new user
- `login(credentials)` - Login user
- `socialLogin(provider, token)` - Social login
- `forgotPassword(email)` - Send password reset email
- `resetPassword(token, password)` - Reset password
- `getCurrentUser()` - Get current user data

### User API (`userAPI`)
- `updateProfile(userData)` - Update user profile
- `changePassword(passwords)` - Change password

### Products API (`productsAPI`)
- `getProducts(params)` - Get products with filters
- `getProduct(id)` - Get single product details

### Cart API (`cartAPI`)
- `getCart()` - Get user cart
- `addToCart(itemData)` - Add item to cart
- `updateCartItem(itemId, quantity)` - Update cart item
- `removeFromCart(itemId)` - Remove item from cart

### Orders API (`ordersAPI`)
- `createOrder(orderData)` - Create new order
- `getOrders()` - Get user orders
- `getOrder(orderId)` - Get order details
- `cancelOrder(orderId)` - Cancel order

### Address API (`addressAPI`)
- `getAddresses()` - Get user addresses
- `addAddress(addressData)` - Add new address
- `updateAddress(id, addressData)` - Update address
- `deleteAddress(id)` - Delete address

### Premium API (`premiumAPI`)
- `getPlans()` - Get premium plans
- `subscribe(planId)` - Subscribe to plan

### Wishlist API (`wishlistAPI`)
- `getWishlist()` - Get user wishlist
- `addToWishlist(productId)` - Add to wishlist
- `removeFromWishlist(productId)` - Remove from wishlist

### Collections API (`collectionsAPI`)
- `getCollections()` - Get all collections
- `getCollectionProducts(collectionId)` - Get collection products

### Search API (`searchAPI`)
- `searchProducts(query, params)` - Search products

### Upload API (`uploadAPI`)
- `uploadImage(file)` - Upload single image
- `uploadImages(files)` - Upload multiple images

### Payment API (`paymentAPI`)
- `createPaymentIntent(orderData)` - Create payment intent
- `verifyPayment(paymentData)` - Verify payment
- `getPaymentMethods()` - Get available payment methods

### Notification API (`notificationAPI`)
- `getNotifications()` - Get user notifications
- `markAsRead(notificationId)` - Mark notification as read
- `markAllAsRead()` - Mark all notifications as read
- `deleteNotification(notificationId)` - Delete notification

### Coupon API (`couponAPI`)
- `validateCoupon(code)` - Validate coupon code
- `getAvailableCoupons()` - Get available coupons

### Analytics API (`analyticsAPI`)
- `trackPageView(pageData)` - Track page view
- `trackEvent(eventData)` - Track custom event

## Error Handling

All API calls return consistent error responses:

```javascript
try {
  const result = await productsAPI.getProducts();
  // Success
} catch (error) {
  const errorInfo = handleAPIError(error);
  console.log(errorInfo.message);
}
```

### Error Response Format

```javascript
{
  status: 400,
  message: "Error description",
  details: {} // Additional error details
}
```

## Utility Functions

### API Utils (`apiUtils.js`)

#### Validation Functions
- `validateEmail(email)` - Validate email format
- `validatePhone(phone)` - Validate Indian phone number
- `validatePassword(password)` - Validate password strength

#### Formatting Functions
- `formatPrice(price)` - Format price to INR
- `formatDate(date)` - Format date to readable format
- `formatDateTime(date)` - Format date and time

#### Helper Functions
- `debounce(func, wait)` - Debounce function calls
- `throttle(func, limit)` - Throttle function calls
- `retry(fn, retries, delay)` - Retry failed API calls
- `generateQueryString(params)` - Generate query string from object

## Best Practices

### 1. Error Handling
Always wrap API calls in try-catch blocks:

```javascript
try {
  const result = await apiCall();
  // Handle success
} catch (error) {
  // Handle error
  console.error(handleAPIError(error));
}
```

### 2. Loading States
Use the `withLoadingState` utility for better UX:

```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async () => {
  await withLoadingState(
    () => productsAPI.getProducts(),
    setLoading,
    setError
  );
};
```

### 3. Caching
Use the cache utility for frequently accessed data:

```javascript
const cache = createAPICache();

const getProducts = async () => {
  const cacheKey = 'products';
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const result = await productsAPI.getProducts();
  cache.set(cacheKey, result, 5 * 60 * 1000); // 5 minutes
  return result;
};
```

### 4. Form Validation
Use the validation utility before API calls:

```javascript
const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email format'
  },
  password: {
    required: true,
    minLength: 8
  }
};

const { isValid, errors } = validateFormData(formData, validationRules);
if (!isValid) {
  // Handle validation errors
  return;
}
```

## Token Management

The authentication service automatically handles:
- Token storage in localStorage
- Token expiration checking
- Automatic token refresh (if implemented)
- Automatic logout on token expiration

## Security Features

- Automatic token injection in request headers
- Token validation and expiration checking
- Automatic logout on 401 responses
- Secure token storage in localStorage

## Development

### Debugging
In development mode, API requests and responses are logged to console.

### Testing
Use the retry utility for flaky network conditions:

```javascript
const result = await retry(
  () => productsAPI.getProducts(),
  3, // retries
  1000 // delay
);
```

## Environment Setup

1. Set the API base URL in your environment variables
2. Ensure CORS is properly configured on the backend
3. Set up proper error handling in your components
4. Configure authentication flow in your app

## Support

For issues or questions about the API services, please refer to:
- API documentation in `api.txt`
- Backend API documentation
- Component examples in the pages directory 