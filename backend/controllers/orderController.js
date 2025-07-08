const Order = require("../models/Order");
const Product = require("../models/Product");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create new order
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount, codCharge } =
      req.body;
    const userId = req.user.id;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    // Check product availability
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Only ${product.stock} available`,
        });
      }
    }

    if (paymentMethod === "razorpay") {
      const options = {
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        receipt: `order_rcpt_${Date.now()}`,
      };

      const razorpayOrder = await razorpay.orders.create(options);

      const newOrder = new Order({
        user: userId,
        items,
        shippingAddress,
        paymentMethod,
        totalAmount,
        codCharge,
        razorpayOrderId: razorpayOrder.id,
        orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // 👈 Unique
      });

      const savedOrder = await newOrder.save();

      res.status(201).json({
        _id: savedOrder._id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount / 100,
        currency: razorpayOrder.currency,
      });
    } else {
      // COD order
      const newOrder = new Order({
        user: userId,
        items,
        shippingAddress,
        paymentMethod,
        totalAmount,
        codCharge,
        status: "processing",
      });

      const savedOrder = await newOrder.save();

      // Update product stock
      for (const item of items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }

      res.status(201).json(savedOrder);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, paymentId, signature } = req.body;

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    // Update order
    const updatedOrder = await Order.findOneAndUpdate(
      { razorpayOrderId },
      {
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
        status: "processing",
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update product stock
    for (const item of updatedOrder.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getImageUrl = (image) => {
  if (!image) return null;

  // Handle full URLs (if migrated from cloud storage)
  if (image.startsWith("http")) return image;

  // Handle local files
  return `${process.env.BASE_URL}/uploads/${image}`;
};

// Get user orders
// Get user orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate({
        path: "items.product",
        select: "name image", // Changed to 'image' (singular)
        options: { allowNull: true },
      })
      .sort("-createdAt");

    const formattedOrders = orders.map((order) => {
      const address = order.shippingAddress
        ? `${order.shippingAddress.address || ""}, ${
            order.shippingAddress.city || ""
          }`
        : "Address not available";

      return {
        _id: order._id,
        createdAt: order.createdAt,
        status: order.status,
        totalAmount: order.totalAmount,
        discount: order.discount,
        address,
        items: order.items.map((item) => {
          if (!item.product) {
            return {
              name: "Deleted Product",
              image: null,
              qty: item.quantity,
              price: item.price,
            };
          }

          // Create full URL using the single image field
          const imageUrl = item.image
            ? `${process.env.BASE_URL}${item.image}`
            : null;

          return {
            name: item.product.name,
            image: getImageUrl(item.product.image),
            qty: item.quantity,
            price: item.price,
          };
        }),
      };
    });

    res.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product", "name images description")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if user owns the order
    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Request return
const returnOrder = async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if order is eligible for return
    if (order.status !== "delivered") {
      return res.status(400).json({ message: "Order not delivered yet" });
    }

    const deliveryDate = new Date(order.updatedAt);
    const returnWindow = new Date();
    returnWindow.setDate(deliveryDate.getDate() + 7);

    if (new Date() > returnWindow) {
      return res.status(400).json({ message: "Return window expired" });
    }

    // Update order status
    order.status = "return_requested";
    order.returnReason = reason;
    await order.save();

    res.json({
      status: "success",
      message: "Return requested",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Generate invoice
const getOrderInvoice = (req, res) => {
  res.json({
    downloadUrl: `${process.env.BASE_URL}/invoices/${req.params.id}.pdf`,
  });
};

module.exports = {
  createOrder,
  verifyPayment,
  getOrders,
  getOrderById,
  returnOrder,
  getOrderInvoice,
};
