// backend/controllers/orderController.js

const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Detailed orders for getOrderById
const detailedOrders = [
  {
    _id: 'ORD-1001',
    createdAt: '2024-06-01T10:00:00.000Z',
    status: 'delivered',
    totalAmount: 2499,
    discount: 0,
    items: [
      {
        product: {
          _id: '1',
          name: 'Black Graphic T-shirt',
          images: ['https://i.pinimg.com/736x/65/f3/21/65f3213693e94dacf246dac482c8e996.jpg']
        },
        size: 'M',
        color: 'Black',
        quantity: 1,
        price: 999
      },
      {
        product: {
          _id: '2',
          name: 'Oversized Hoodie',
          images: ['https://i.pinimg.com/736x/65/f3/21/65f3213693e94dacf246dac482c8e996.jpg']
        },
        size: 'L',
        color: 'Grey',
        quantity: 1,
        price: 1500
      }
    ],
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Demo Street',
      city: 'City',
      state: 'State',
      pincode: '123456',
      phone: '9876543210'
    }
  },
  {
    _id: 'ORD-1002',
    createdAt: '2024-05-28T10:00:00.000Z',
    status: 'shipped',
    totalAmount: 1799,
    discount: 100,
    items: [
      {
        product: {
          _id: '3',
          name: 'White Cap',
          images: ['https://i.pinimg.com/736x/65/f3/21/65f3213693e94dacf246dac482c8e996.jpg']
        },
        size: 'Free',
        color: 'White',
        quantity: 1,
        price: 1799
      }
    ],
    shippingAddress: {
      fullName: 'Jane Smith',
      address: '456 Example Ave',
      city: 'City',
      state: 'State',
      pincode: '654321',
      phone: '9876543211'
    }
  },
  {
    _id: 'ORD-1003',
    createdAt: '2024-05-20T10:00:00.000Z',
    status: 'processing',
    totalAmount: 3499,
    discount: 0,
    items: [
      {
        product: {
          _id: '4',
          name: 'Joggers',
          images: ['https://via.placeholder.com/80x80?text=Joggers']
        },
        size: 'L',
        color: 'Grey',
        quantity: 1,
        price: 1499
      },
      {
        product: {
          _id: '5',
          name: 'Sneakers',
          images: ['https://via.placeholder.com/80x80?text=Sneakers']
        },
        size: '9',
        color: 'White',
        quantity: 1,
        price: 1799
      },
      {
        product: {
          _id: '6',
          name: 'Socks',
          images: ['https://via.placeholder.com/80x80?text=Socks']
        },
        size: 'Free',
        color: 'Black',
        quantity: 1,
        price: 201
      }
    ],
    shippingAddress: {
      fullName: 'Alice Brown',
      address: '789 Sample Road',
      city: 'City',
      state: 'State',
      pincode: '789123',
      phone: '9876543212'
    }
  }
];

// Orders list for getOrders (simplified)
const listOrders = detailedOrders.map(order => ({
  _id: order._id,
  createdAt: order.createdAt,
  status: order.status,
  totalAmount: order.totalAmount,
  discount: order.discount,
  address: `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.pincode}`,
  items: order.items.map(item => ({
    name: item.product.name,
    image: item.product.images[0],
    qty: item.quantity,
    price: item.price
  }))
}));

// GET /api/orders
const getOrders = (req, res) => {
  res.json(listOrders);
};

// GET /api/orders/:id
const getOrderById = (req, res) => {
  const order = detailedOrders.find(o => o._id === req.params.id);
  if (!order) {
    return res.status(404).json({ status: 'error', message: 'Order not found' });
  }
  res.json(order);
};

// POST /api/orders/:id/return
const returnOrder = (req, res) => {
  res.json({
    status: 'success',
    message: 'Return/Exchange request submitted',
    orderId: req.params.id,
    data: req.body
  });
};

// GET /api/orders/:id/invoice
const getOrderInvoice = (req, res) => {
  // For now, return a dummy invoice download link
  res.json({
    status: 'success',
    message: 'Invoice generated',
    downloadUrl: `http://localhost:5000/invoices/${req.params.id}.pdf`
  });
};

// POST /api/orders/create
const createOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod, total, codCharge } = req.body;

  if (paymentMethod === 'razorpay') {
    try {
      const options = {
        amount: total * 100, // amount in paise
        currency: "INR",
        receipt: "order_rcptid_" + Math.floor(Math.random() * 1000000),
      };
      const order = await razorpay.orders.create(options);
      return res.status(201).json({
        _id: order.receipt,
        items,
        shippingAddress,
        paymentMethod,
        total,
        codCharge: codCharge || 0,
        status: 'created',
        createdAt: new Date().toISOString(),
        razorpayOrderId: order.id,
        amount: total
      });
    } catch (err) {
      console.error('Razorpay order creation error:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to create Razorpay order' });
    }
  }

  // For COD, just return the order
  const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
  const order = {
    _id: orderId,
    items,
    shippingAddress,
    paymentMethod,
    total,
    codCharge: codCharge || 0,
    status: 'created',
    createdAt: new Date().toISOString(),
  };
  res.status(201).json(order);
};

// POST /api/orders/verify-payment
const verifyPayment = (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  console.log('Verify payment data:', req.body);
  // For now, always return success if all fields are present
  if (orderId && paymentId && signature) {
    return res.json({ success: true, message: "Payment verified" });
  }
  res.status(400).json({ success: false, message: "Missing payment verification data" });
};

module.exports = { getOrders, getOrderById, returnOrder, getOrderInvoice, createOrder, verifyPayment }; 