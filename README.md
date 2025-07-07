# BEATEN - Premium Streetwear E-commerce Platform

BEATEN is a modern e-commerce platform built with React and Node.js, offering premium streetwear clothing and accessories.

## Features

- **User Authentication**
  - Secure login and registration
  - Password reset functionality
  - Profile management
  - Premium membership

- **Shopping Experience**
  - Browse products by category
  - Advanced filtering and sorting
  - Detailed product views
  - Shopping cart functionality
  - Secure checkout process

- **Order Management**
  - Order history
  - Order tracking
  - Order details view

- **Premium Features**
  - Exclusive discounts
  - Early access to new releases
  - Priority shipping
  - Premium support

## Tech Stack

### Frontend
- React
- Material-UI
- React Router
- Formik & Yup
- Axios
- Context API

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Stripe Payment Integration

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/beaten.git
cd beaten
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Backend (.env)
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd ../frontend
npm start
```

## Project Structure

```
beaten/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── utils/
│       ├── App.js
│       └── index.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/beaten

## API Documentation and Integration Guide

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. User Registration
```http
POST /auth/register
```
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```
**Response:**
```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "isPremium": boolean
  }
}
```

#### 2. User Login
```http
POST /auth/login
```
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "isPremium": boolean
  }
}
```

### Product Endpoints

#### 1. Get All Products
```http
GET /products
```
**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `category`: string (optional)
- `search`: string (optional)
- `sort`: string (optional, e.g., "price", "-price")

**Response:**
```json
{
  "products": [
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "price": number,
      "image": "string",
      "additionalImages": ["string"],
      "category": "string",
      "collection": "string",
      "inStock": boolean,
      "sizes": ["string"],
      "colors": ["string"],
      "material": "string",
      "brand": "string"
    }
  ],
  "total": number,
  "page": number,
  "pages": number
}
```

#### 2. Get Single Product
```http
GET /products/:id
```
**Response:**
```json
{
  "_id": "string",
  "name": "string",
  "description": "string",
  "price": number,
  "image": "string",
  "additionalImages": ["string"],
  "category": "string",
  "collection": "string",
  "inStock": boolean,
  "sizes": ["string"],
  "colors": ["string"],
  "material": "string",
  "brand": "string"
}
```

### Cart Endpoints

#### 1. Get User Cart
```http
GET /user/me
```
**Headers:**
```
Authorization: Bearer <token>
```
**Response:**
```json
{
  "savedCart": [
    {
      "product": {
        "_id": "string",
        "name": "string",
        "price": number,
        "image": "string"
      },
      "quantity": number,
      "size": "string",
      "color": "string"
    }
  ]
}
```

#### 2. Update Cart
```http
PUT /user/me
```
**Headers:**
```
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "savedCart": [
    {
      "product": {
        "_id": "string",
        "name": "string",
        "price": number,
        "image": "string"
      },
      "quantity": number,
      "size": "string",
      "color": "string"
    }
  ]
}
```

### Order Endpoints

#### 1. Create Order
```http
POST /orders
```
**Headers:**
```
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "items": [
    {
      "product": "string",
      "quantity": number,
      "size": "string",
      "color": "string"
    }
  ],
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "paymentMethod": "string"
}
```

#### 2. Get User Orders
```http
GET /orders
```
**Headers:**
```
Authorization: Bearer <token>
```
**Response:**
```json
{
  "orders": [
    {
      "_id": "string",
      "items": [
        {
          "product": {
            "_id": "string",
            "name": "string",
            "price": number,
            "image": "string"
          },
          "quantity": number,
          "size": "string",
          "color": "string"
        }
      ],
      "total": number,
      "status": "string",
      "createdAt": "string"
    }
  ]
}
```

## Frontend Integration

### Environment Variables
Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### API Integration Example
```javascript
// Example of making an API call using axios
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example API call
const getProducts = async (params) => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
```

## Error Handling

All API endpoints follow a consistent error response format:
```json
{
  "message": "string",
  "errors": [
    {
      "field": "string",
      "message": "string"
    }
  ]
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Security Considerations

1. All sensitive endpoints require authentication
2. Use HTTPS in production
3. Implement rate limiting
4. Validate all input data
5. Sanitize user inputs
6. Implement proper CORS policies

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd frontend
   npm install
   ```
3. Set up environment variables
4. Start the development servers:
   ```bash
   # Backend
   npm run dev

   # Frontend
   npm start
   ```

## Testing

1. Unit Tests:
   ```bash
   npm test
   ```
2. API Tests:
   ```bash
   npm run test:api
   ```

## Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Set up production environment variables
3. Deploy backend to your hosting service
4. Configure CORS and security settings
5. Set up SSL certificates
6. Configure domain and DNS settings

## Support

For any questions or issues, please contact the development team or create an issue in the repository. 