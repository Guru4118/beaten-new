import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import User from "../models/User.js";

// Helper function to safely format dates
const safeGetYear = (date) => {
  return date instanceof Date ? date.getFullYear() : new Date().getFullYear();
};

// @desc    Get all orders for admin dashboard
// @route   GET /api/orders/admin
// @access  Private/Admin
const getAdminOrders = asyncHandler(async (req, res) => {
  try {
    // Fetch orders with proper population
    const orders = await Order.find({})
      .populate({
        path: "user",
        select: "name email",
        model: User,
        options: { allowNull: true }
      })
      .populate({
        path: "items.product",
        select: "name image", // Populate product details
        model: "Product"
      })
      .sort({ createdAt: -1 });

    // Format orders to match frontend expectations
    const formattedOrders = orders.map((order) => {
      let customer = {
        name: "Guest User",
        email: "guest@example.com",
        phone: ""
      };
      
      if (order.user) {
        customer = {
          name: order.user.name || "No Name",
          email: order.user.email || "no-email@example.com",
          phone: order.shippingAddress?.phone || ""
        };
      }

      // Generate order number if not present
      const orderIdSuffix = order._id.toString().slice(-4);
      const orderNumber = order.orderNumber || `ORD-${safeGetYear(order.createdAt)}-${orderIdSuffix}`;

      // Map items to match frontend structure
      const items = (order.items || []).map((item) => ({
        name: item.product?.name || "Unknown Product",
        quantity: item.quantity || 0,
        price: item.price || 0,
        image: item.product?.image || ""
      }));

      return {
        _id: order._id,
        orderNumber,
        customer,
        date: order.createdAt.toISOString().split("T")[0],
        items, // Use actual items array
        total: order.totalAmount, // Use correct total field
        status: order.status || "Unknown",
        paymentMethod: order.paymentMethod || "N/A",
        shippingAddress: order.shippingAddress
          ? `${order.shippingAddress.address || ""}, ${
              order.shippingAddress.city || ""
            }, ${order.shippingAddress.country || ""}`
          : "No shipping address",
        trackingNumber: order.trackingNumber || null,
        notes: order.notes || "",
        createdAt: order.createdAt
      };
    });

    res.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    res.status(500).json({
      message: "Server error while fetching orders",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// ... rest of your controller code remains the same ...

// @desc    Update order status
// @route   PUT /api/orders/admin/:id
// @access  Private/Admin
// @desc    Update order status
// @route   PUT /api/orders/admin/:id
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, trackingNumber } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    // Validate status - MUST MATCH YOUR ORDER MODEL ENUM
    const validStatuses = [
      "pending", "processing", "shipped", "delivered", "cancelled", "returned"
    ];
    
    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error("Invalid order status");
    }

    // Update order
    order.status = status;
    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }

    // Add to status history
    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      updatedBy: req.user ? req.user.id : "admin" // Use actual user ID
    });

    const updatedOrder = await order.save();

    res.json({
      _id: updatedOrder._id,
      status: updatedOrder.status,
      trackingNumber: updatedOrder.trackingNumber,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      message: "Server error while updating order",
      error: error.message,
    });
  }
});


// @desc    Get order statistics for dashboard
// @route   GET /api/orders/admin/stats
// @access  Private/Admin
const getOrderStats = asyncHandler(async (req, res) => {
  try {
   // Calculate total orders
    const totalOrders = await Order.countDocuments();

    // Calculate total revenue - use totalAmount
    const revenueStats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          averageOrderValue: { $avg: "$totalAmount" },
        },
      },
    ]);

    // Calculate orders by status
    const statusCounts = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert status counts to object
    const statusStats = {};
    statusCounts.forEach((stat) => {
      statusStats[stat._id] = stat.count;
    });

    // Get recent orders
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name");

    res.json({
      totalOrders,
      totalRevenue: revenueStats[0]?.totalRevenue || 0,
      averageOrderValue: revenueStats[0]?.averageOrderValue || 0,
      statusStats,
      recentOrders: recentOrders.map((order) => ({
        _id: order._id,
        orderNumber: order.orderNumber || `ORD-${order.createdAt.getFullYear()}-${order._id.toString().slice(-4)}`,
        customer: order.user?.name || "Guest",
        date: order.createdAt.toISOString().split("T")[0],
        total: order.totalAmount, // Use totalAmount
        status: order.status,
      })),
    });
  }catch (error) {
    console.error("Error fetching order statistics:", error);
    res.status(500).json({
      message: "Server error while fetching statistics",
      error: error.message,
    });
  }
});

export { getAdminOrders, updateOrderStatus, getOrderStats };
