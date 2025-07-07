# BEATEN Backend API

A comprehensive MERN stack backend for the BEATEN e-commerce platform with authentication, user management, and profile functionality.

## Features

- **Authentication System**
  - User registration and login
  - JWT token-based authentication
  - OTP-based login support
  - Password reset functionality
  - Social login integration

- **Profile Management**
  - User profile CRUD operations
  - Address management (add, update, delete)
  - Saved payment cards management
  - Avatar upload functionality
  - Membership status tracking
  - Account deletion

- **Security Features**
  - Password hashing with bcrypt
  - JWT token authentication
  - Input validation and sanitization
  - Rate limiting (can be added)
  - CORS configuration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Mongoose validation + custom validation
- **Email Service**: Nodemailer (configurable)
- **SMS Service**: Twilio (configurable)

## Project Structure

```
backend/
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── userController.js    # Profile management logic
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   ├── errorHandler.js     # Global error handling
│   └── notFound.js         # 404 handler
├── models/
│   ├── User.js             # User model
│   ├── Address.js          # Address model
│   ├── SavedCard.js        # Saved card model
│   └── OTP.js              # OTP model
├── routes/
│   ├── auth.js             # Authentication routes
│   └── users.js            # User management routes
├── utils/
│   ├── emailService.js     # Email service utility
│   └── smsService.js       # SMS service utility
├── server.js               # Main server file
├── setup.js                # Database setup
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone and Install

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp env.example .env
```

Configure the following environment variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/beaten_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_REFRESH_EXPIRE=30d

# Email Configuration (for OTP and notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@beaten.com

# SMS Configuration (for OTP)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# File Upload (for avatars)
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup

```bash
npm run setup
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/send-otp` | Send OTP for login | No |
| POST | `/api/auth/verify-otp` | Verify OTP for login | No |
| POST | `/api/auth/forgot-password` | Send password reset email | No |
| POST | `/api/auth/reset-password/:token` | Reset password | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/auth/refresh` | Refresh access token | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |

### User Management Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/profile` | Update user profile | Yes |
| PUT | `/api/users/change-password` | Change password | Yes |
| DELETE | `/api/users/account` | Delete account | Yes |
| GET | `/api/users/addresses` | Get user addresses | Yes |
| POST | `/api/users/addresses` | Add new address | Yes |
| PUT | `/api/users/addresses/:id` | Update address | Yes |
| DELETE | `/api/users/addresses/:id` | Delete address | Yes |
| GET | `/api/users/saved-cards` | Get saved cards | Yes |
| POST | `/api/users/saved-cards` | Add saved card | Yes |
| DELETE | `/api/users/saved-cards/:id` | Delete saved card | Yes |
| GET | `/api/users/membership` | Get membership info | Yes |
| POST | `/api/users/avatar` | Upload avatar | Yes |

## Data Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required, unique),
  password: String (required, hashed),
  dob: Date (required),
  gender: String (enum: ['male', 'female', 'other']),
  avatar: String,
  isPremium: Boolean (default: false),
  premiumExpiry: Date,
  role: String (enum: ['user', 'admin'], default: 'user'),
  status: String (enum: ['active', 'blocked'], default: 'active'),
  addresses: [ObjectId] (ref: 'Address'),
  emailVerified: Boolean (default: false),
  phoneVerified: Boolean (default: false),
  lastLogin: Date,
  loginAttempts: Number (default: 0),
  lockUntil: Date
}
```

### Address Model
```javascript
{
  user: ObjectId (ref: 'User', required),
  label: String (enum: ['Home', 'Work', 'Other'], required),
  fullName: String (required),
  phone: String (required),
  addressLine1: String (required),
  addressLine2: String,
  city: String (required),
  state: String (required),
  pincode: String (required),
  country: String (default: 'India'),
  isDefault: Boolean (default: false),
  isActive: Boolean (default: true)
}
```

### SavedCard Model
```javascript
{
  user: ObjectId (ref: 'User', required),
  cardType: String (enum: ['visa', 'mastercard', 'amex', 'rupay', 'discover']),
  last4: String (required),
  expiryMonth: String (required),
  expiryYear: String (required),
  cardholderName: String (required),
  cardToken: String (required),
  maskedCardNumber: String (required),
  isDefault: Boolean (default: false),
  isActive: Boolean (default: true)
}
```

## Authentication Flow

### 1. Registration
```javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "dob": "1990-01-01",
  "gender": "male"
}
```

### 2. Login
```javascript
POST /api/auth/login
{
  "emailOrPhone": "john@example.com",
  "password": "password123"
}
```

### 3. OTP Login
```javascript
// Step 1: Send OTP
POST /api/auth/send-otp
{
  "emailOrPhone": "john@example.com"
}

// Step 2: Verify OTP
POST /api/auth/verify-otp
{
  "emailOrPhone": "john@example.com",
  "otp": "123456"
}
```

## Profile Management Examples

### Update Profile
```javascript
PUT /api/users/profile
Headers: Authorization: Bearer <token>
{
  "name": "John Updated",
  "gender": "male",
  "dob": "1990-01-01",
  "phone": "9876543210",
  "email": "john.updated@example.com"
}
```

### Add Address
```javascript
POST /api/users/addresses
Headers: Authorization: Bearer <token>
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

### Add Saved Card
```javascript
POST /api/users/saved-cards
Headers: Authorization: Bearer <token>
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

## Error Handling

The API uses a centralized error handling system:

```javascript
// Success Response
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": { ... }
}

// Error Response
{
  "status": "error",
  "message": "Error description"
}
```

## Security Features

1. **Password Security**
   - Passwords are hashed using bcryptjs
   - Minimum 6 characters required
   - Password comparison is secure

2. **JWT Security**
   - Tokens expire after 7 days
   - Refresh tokens for extended sessions
   - Secure token generation

3. **Input Validation**
   - Mongoose schema validation
   - Custom validation middleware
   - SQL injection prevention

4. **Rate Limiting**
   - Can be implemented using express-rate-limit
   - Configurable limits per endpoint

## Testing

### Using Postman
1. Import the provided Postman collection
2. Set up environment variables
3. Test all endpoints systematically

### Manual Testing
```bash
# Test server health
curl http://localhost:5000/api/health

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","phone":"9876543210","dob":"1990-01-01","gender":"male"}'
```

## Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
JWT_REFRESH_SECRET=your_strong_refresh_secret
```

### PM2 Deployment
```bash
npm install -g pm2
pm2 start server.js --name "beaten-backend"
pm2 save
pm2 startup
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation 