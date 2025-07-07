# BEATEN E-commerce API Testing Guide

## Quick Start for Postman Testing

### 1. Register User API (Based on Register.js component)

**Endpoint:** `POST {{base_url}}/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phone": "9876543210",
  "dob": "1990-01-01",
  "gender": "male"
}
```

**Expected Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "gender": "male",
    "dob": "1990-01-01T00:00:00.000Z",
    "isPremium": false,
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Send OTP API (Based on Login.js component)

**Endpoint:** `POST {{base_url}}/auth/send-otp`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "emailOrPhone": "john.doe@example.com"
}
```

**Expected Response (200):**
```json
{
  "message": "OTP sent successfully",
  "emailOrPhone": "john.doe@example.com"
}
```

### 3. Verify OTP & Login API (Based on Login.js component)

**Endpoint:** `POST {{base_url}}/auth/verify-otp`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "emailOrPhone": "john.doe@example.com",
  "otp": "123456"
}
```

**Expected Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "gender": "male",
    "dob": "1990-01-01T00:00:00.000Z",
    "isPremium": false,
    "role": "user"
  }
}
```

### 4. Traditional Login API (Alternative method)

**Endpoint:** `POST {{base_url}}/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "emailOrPhone": "john.doe@example.com",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "gender": "male",
    "dob": "1990-01-01T00:00:00.000Z",
    "isPremium": false,
    "role": "user"
  }
}
```

### 5. Get Current User API

**Endpoint:** `GET {{base_url}}/auth/me`

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response (200):**
```json
{
  "_id": "user_id_here",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "gender": "male",
  "dob": "1990-01-01T00:00:00.000Z",
  "isPremium": false,
  "role": "user",
  "addresses": [],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Environment Variables Setup

### Create Environment in Postman:

1. **Environment Name:** `BEATEN API Local`
2. **Variables:**
   - `base_url`: `http://localhost:5000/api`
   - `token`: (leave empty, will be set after login)
   - `address_id`: (will be set after creating address)
   - `card_id`: (will be set after creating saved card)

### Set Token After Login:

After successful login, set the token variable:
1. Go to the login/verify-otp request
2. In the "Tests" tab, add this script:
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("token", response.token);
}
```

## Complete API Collection

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/send-otp` | Send OTP for login | No |
| POST | `/auth/verify-otp` | Verify OTP and login | No |
| POST | `/auth/login` | Traditional login | No |
| GET | `/auth/me` | Get current user | Yes |
| POST | `/auth/forgot-password` | Send password reset | No |
| POST | `/auth/reset-password/:token` | Reset password | No |

### User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| PUT | `/users/profile` | Update profile | Yes |
| PUT | `/users/change-password` | Change password | Yes |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get products with filters | No |
| GET | `/products/:id` | Get product details | No |

### Cart Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/cart` | Get user cart | Yes |
| POST | `/cart` | Add to cart | Yes |
| PUT | `/cart/:itemId` | Update cart item | Yes |
| DELETE | `/cart/:itemId` | Remove from cart | Yes |

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders` | Create order | Yes |
| GET | `/orders` | Get user orders | Yes |
| GET | `/orders/:orderId` | Get order details | Yes |
| POST | `/orders/:orderId/cancel` | Cancel order | Yes |

### Address Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/user/addresses` | Get addresses | Yes |
| POST | `/user/addresses` | Add address | Yes |
| PUT | `/user/addresses/:id` | Update address | Yes |
| DELETE | `/user/addresses/:id` | Delete address | Yes |

## Testing Workflow

### 1. Register a New User
```bash
POST {{base_url}}/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "phone": "9876543210",
  "dob": "1990-01-01",
  "gender": "male"
}
```

### 2. OTP-Based Login (Recommended)
```bash
# Step 1: Send OTP
POST {{base_url}}/auth/send-otp
{
  "emailOrPhone": "test@example.com"
}

# Step 2: Verify OTP and Login
POST {{base_url}}/auth/verify-otp
{
  "emailOrPhone": "test@example.com",
  "otp": "123456"
}
```

### 3. Traditional Login (Alternative)
```bash
POST {{base_url}}/auth/login
{
  "emailOrPhone": "test@example.com",
  "password": "password123"
}
```

### 4. Test Protected Endpoints
Use the token from login in the Authorization header:
```
Authorization: Bearer {{token}}
```

### 5. Test Product Listing
```bash
GET {{base_url}}/products?category=shirts&gender=male&page=1&limit=10
```

### 6. Test Cart Operations
```bash
# Add to cart
POST {{base_url}}/cart
{
  "productId": "product_id_here",
  "quantity": 1,
  "size": "M",
  "color": "blue"
}

# Get cart
GET {{base_url}}/cart
```

## Error Response Format

All API errors follow this format:
```json
{
  "status": "error",
  "code": 400,
  "message": "Error description",
  "details": {}
}
```

## Common HTTP Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **429**: Too Many Requests
- **500**: Internal Server Error

## Frontend Integration

The frontend Login.js component calls the API like this:

```javascript
// Using the authService for OTP-based login
const result = await authService.sendOtp(emailOrPhone);
const loginResult = await authService.verifyOtp(emailOrPhone, otp);

// Or using the API directly
const result = await authAPI.sendOtp(emailOrPhone);
const loginResult = await authAPI.verifyOtp(emailOrPhone, otp);

// For traditional login
const loginResult = await authService.login({
  emailOrPhone: emailOrPhone,
  password: password
});
```

## Validation Rules

### Register Form Validation:
- **Name**: Minimum 2 characters, required
- **Email**: Valid email format, required
- **Password**: Minimum 6 characters, required
- **Phone**: 10 digits, required
- **DOB**: Valid date, required
- **Gender**: One of ["male", "female", "other"], required

### Login Form Validation:
- **Email/Phone**: Valid email or 10-digit phone number, required
- **OTP**: 6 digits, required
- **Password**: Minimum 6 characters (for traditional login)

### Backend Validation:
- Email must be unique
- Phone number must be unique
- Password must be at least 6 characters
- Date of birth must be valid date
- Gender must be one of the allowed values
- OTP must be valid and not expired

## Testing Tips

1. **Start with Register**: Always test registration first
2. **Test OTP Flow**: Use the OTP-based login for better security
3. **Save Token**: Automatically save the token after login
4. **Test Error Cases**: Try invalid data to test validation
5. **Check Headers**: Ensure Content-Type is set correctly
6. **Test Protected Routes**: Use the saved token for auth-required endpoints
7. **Validate Responses**: Check that response format matches expected structure

## Environment Setup

### Development:
- **Base URL**: `http://localhost:5000/api`
- **Database**: MongoDB (local or cloud)
- **Port**: 5000

### Production:
- **Base URL**: `https://api.beaten.com/api`
- **Database**: MongoDB Atlas
- **Port**: 443 (HTTPS)

## Troubleshooting

### Common Issues:

1. **CORS Error**: Ensure backend has CORS configured
2. **401 Unauthorized**: Check if token is valid and included in headers
3. **400 Bad Request**: Validate request body format
4. **500 Internal Error**: Check server logs for detailed error
5. **Connection Refused**: Ensure backend server is running
6. **OTP Expired**: OTPs typically expire after 5 minutes
7. **Invalid OTP**: Ensure OTP is exactly 6 digits

### Debug Steps:

1. Check if backend server is running on port 5000
2. Verify database connection
3. Check request headers and body format
4. Validate environment variables
5. Check server logs for detailed error messages
6. Verify OTP generation and storage in backend
7. Check email/SMS service configuration for OTP delivery

## Setup Instructions

1. **Import the Postman Collection**
   - Open Postman
   - Click "Import" and select `BEATEN_API_Postman_Collection.json`
   - The collection will be imported with all endpoints organized by category

2. **Configure Environment Variables**
   - Create a new environment in Postman
   - Add the following variables:
     - `base_url`: `http://localhost:5000/api` (or your backend URL)
     - `token`: (will be set after login)
     - `address_id`: (will be set after creating address)
     - `card_id`: (will be set after creating saved card)

## Authentication Flow

### 1. Register User
- **Endpoint**: `POST {{base_url}}/auth/register`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "dob": "1990-01-01",
  "gender": "male"
}
```
- **Response**: User data with token

### 2. Login User
- **Endpoint**: `POST {{base_url}}/auth/login`
- **Body**:
```json
{
  "emailOrPhone": "john@example.com",
  "password": "password123"
}
```
- **Response**: User data with token
- **Action**: Copy the token from response and set it as the `token` environment variable

### 3. OTP Login Flow (Alternative)
- **Send OTP**: `POST {{base_url}}/auth/send-otp`
- **Verify OTP**: `POST {{base_url}}/auth/verify-otp`

## Profile Management Testing

### 1. Get User Profile
- **Endpoint**: `GET {{base_url}}/users/profile`
- **Headers**: `Authorization: Bearer {{token}}`
- **Description**: Retrieves current user's profile information
- **Expected Response**: User data with addresses, membership info

### 2. Update Profile
- **Endpoint**: `PUT {{base_url}}/users/profile`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body**:
```json
{
  "name": "John Updated",
  "gender": "male",
  "dob": "1990-01-01",
  "phone": "9876543210",
  "email": "john.updated@example.com"
}
```
- **Description**: Updates user profile information
- **Validation**: Email and phone uniqueness checked

### 3. Change Password
- **Endpoint**: `PUT {{base_url}}/users/change-password`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body**:
```json
{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```
- **Description**: Changes user password with current password verification

### 4. Delete Account
- **Endpoint**: `DELETE {{base_url}}/users/account`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body**:
```json
{
  "password": "password123"
}
```
- **Description**: Permanently deletes user account and all associated data

## Address Management Testing

### 1. Get Addresses
- **Endpoint**: `GET {{base_url}}/users/addresses`
- **Headers**: `Authorization: Bearer {{token}}`
- **Description**: Retrieves all user addresses

### 2. Add Address
- **Endpoint**: `POST {{base_url}}/users/addresses`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body**:
```json
{
  "label": "Home",
  "fullName": "John Doe",
  "phone": "9876543210",
  "addressLine1": "123 Main Street",
  "addressLine2": "Apartment 4B",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "country": "India",
  "isDefault": true
}
```
- **Description**: Adds new address for user
- **Action**: Copy the returned address ID and set as `address_id` environment variable

### 3. Update Address
- **Endpoint**: `PUT {{base_url}}/users/addresses/{{address_id}}`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body**:
```json
{
  "label": "Work",
  "fullName": "John Doe",
  "phone": "9876543210",
  "addressLine1": "456 Business Park",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400002"
}
```
- **Description**: Updates existing address

### 4. Delete Address
- **Endpoint**: `DELETE {{base_url}}/users/addresses/{{address_id}}`
- **Headers**: `Authorization: Bearer {{token}}`
- **Description**: Deletes specific address

## Saved Cards Management Testing

### 1. Get Saved Cards
- **Endpoint**: `GET {{base_url}}/users/saved-cards`
- **Headers**: `Authorization: Bearer {{token}}`
- **Description**: Retrieves all user saved cards

### 2. Add Saved Card
- **Endpoint**: `POST {{base_url}}/users/saved-cards`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body**:
```json
{
  "cardType": "visa",
  "last4": "1234",
  "expiryMonth": "12",
  "expiryYear": "2026",
  "cardholderName": "John Doe",
  "cardToken": "tok_visa_123456",
  "maskedCardNumber": "**** **** **** 1234",
  "isDefault": true
}
```
- **Description**: Adds new saved card
- **Action**: Copy the returned card ID and set as `card_id` environment variable

### 3. Delete Saved Card
- **Endpoint**: `DELETE {{base_url}}/users/saved-cards/{{card_id}}`
- **Headers**: `Authorization: Bearer {{token}}`
- **Description**: Deletes specific saved card

## Membership Testing

### 1. Get Membership Info
- **Endpoint**: `GET {{base_url}}/users/membership`
- **Headers**: `Authorization: Bearer {{token}}`
- **Description**: Retrieves user membership status and details
- **Response**: Premium status, days left, amount saved

## Avatar Management Testing

### 1. Upload Avatar
- **Endpoint**: `POST {{base_url}}/users/avatar`
- **Headers**: `Authorization: Bearer {{token}}`
- **Body**:
```json
{
  "avatarUrl": "https://example.com/avatar.jpg"
}
```
- **Description**: Updates user avatar (currently accepts URL, can be extended for file upload)

## Testing Scenarios

### Complete Profile Flow
1. Register a new user
2. Login and get token
3. Get profile (should return user data)
4. Update profile with new information
5. Add multiple addresses
6. Add saved cards
7. Check membership status
8. Change password
9. Delete account (optional)

### Error Testing
1. **Invalid Token**: Remove or modify token to test authentication
2. **Duplicate Email/Phone**: Try updating profile with existing email/phone
3. **Invalid Data**: Send malformed data to test validation
4. **Unauthorized Access**: Try accessing other user's data

### Edge Cases
1. **Multiple Default Addresses**: Only one should be default
2. **Multiple Default Cards**: Only one should be default
3. **Invalid Address ID**: Try updating/deleting non-existent address
4. **Invalid Card ID**: Try updating/deleting non-existent card

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Common Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid/missing token)
- `404`: Not Found
- `500`: Internal Server Error

## Tips for Testing

1. **Use Environment Variables**: Set up variables for dynamic data
2. **Test Authentication**: Always verify token is working
3. **Validate Responses**: Check response format and data
4. **Test Error Cases**: Don't just test happy path
5. **Clean Up**: Delete test data after testing
6. **Use Collections**: Organize tests by functionality
7. **Automate**: Use Postman's test scripts for automated validation

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure backend allows frontend origin
2. **Token Expiry**: Refresh token if getting 401 errors
3. **Validation Errors**: Check request body format
4. **Database Issues**: Ensure MongoDB is running
5. **Port Conflicts**: Check if port 5000 is available

### Debug Steps
1. Check server logs for errors
2. Verify environment variables
3. Test endpoints individually
4. Check database connections
5. Validate request/response format 