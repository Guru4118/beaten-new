import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  MenuItem,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  LocalShipping as ShippingIcon,
  CheckCircle as DeliveredIcon,
  Cancel as CancelledIcon,
  RemoveRedEye as ViewIcon,
  ShoppingCart as ShoppingCartIcon,
  Download as DownloadIcon,
  Autorenew as ExchangeIcon,
  ReceiptLong as InvoiceIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";

const getStatusColor = (status) => {
  switch (status) {
    case "delivered":
      return "success";
    case "shipped":
      return "info";
    case "processing":
      return "warning";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "shipped":
      return <ShippingIcon />;
    case "delivered":
      return <DeliveredIcon />;
    case "cancelled":
      return <CancelledIcon />;
    default:
      return null;
  }
};

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/80x80?text=Product";

const orders = [
  {
    _id: "ORD-1001",
    createdAt: "2024-06-01",
    status: "delivered",
    totalAmount: 2499,
    address: "123 Demo Street, City, State, 123456",
    items: [
      {
        name: "Black Graphic T-shirt",
        image:
          "https://i.pinimg.com/736x/65/f3/21/65f3213693e94dacf246dac482c8e996.jpg",
        qty: 1,
        price: 999,
      },
      {
        name: "Oversized Hoodie",
        image:
          "https://i.pinimg.com/736x/65/f3/21/65f3213693e94dacf246dac482c8e996.jpg",
        qty: 1,
        price: 1500,
      },
    ],
  },
  {
    _id: "ORD-1002",
    createdAt: "2024-05-28",
    status: "shipped",
    totalAmount: 1799,
    address: "456 Example Ave, City, State, 654321",
    items: [
      {
        name: "White Cap",
        image:
          "https://i.pinimg.com/736x/65/f3/21/65f3213693e94dacf246dac482c8e996.jpg",
        qty: 1,
        price: 1799,
      },
    ],
  },
  {
    _id: "ORD-1003",
    createdAt: "2024-05-20",
    status: "processing",
    totalAmount: 3499,
    address: "789 Sample Road, City, State, 789123",
    items: [
      {
        name: "Joggers",
        image: "https://via.placeholder.com/80x80?text=Joggers",
        qty: 1,
        price: 1499,
      },
      {
        name: "Sneakers",
        image: "https://via.placeholder.com/80x80?text=Sneakers",
        qty: 1,
        price: 1799,
      },
      {
        name: "Socks",
        image: "https://via.placeholder.com/80x80?text=Socks",
        qty: 1,
        price: 201,
      },
    ],
  },
];

const trackingSteps = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

// Define matte black colors
const matteColors = {
  900: "#1a1a1a",
  800: "#2d2d2d",
  700: "#404040",
  600: "#525252",
  100: "#f5f5f5",
};

const Orders = ({ mode }) => {
  const navigate = useNavigate();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [returnItem, setReturnItem] = useState(null);
  const [returnReason, setReturnReason] = useState("");
  const [returnComment, setReturnComment] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleExpandToggle = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setTrackOpen(true);
  };

  const handleClose = () => {
    setDetailsOpen(false);
    setTrackOpen(false);
    setSelectedOrder(null);
  };

  const handleOpenReturnDialog = (orderId, item, idx) => {
    setReturnItem({ orderId, item, idx });
    setReturnReason("");
    setReturnComment("");
    setReturnDialogOpen(true);
  };

  const handleCloseReturnDialog = () => {
    setReturnDialogOpen(false);
    setReturnItem(null);
  };

  const handleSubmitReturn = (e) => {
    e.preventDefault();
    setReturnDialogOpen(false);
    setSnackbarOpen(true);
    setReturnItem(null);
  };

  if (orders.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 3, textAlign: "center" }}
        >
          My Orders
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Box sx={{ textAlign: "center", py: 8 }}>
          <ShoppingCartIcon sx={{ fontSize: 60, color: "grey.400", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            You have no orders yet.
          </Typography>
          <Button variant="contained" color="primary" href="/products">
            Shop Now
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 4, md: 8 },
        bgcolor: mode === "dark" ? "#181818" : "#fff",
        color: mode === "dark" ? "#fff" : "#181818",
        minHeight: "100vh",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, mb: 3, textAlign: "center" }}
      >
        My Orders
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} key={order._id}>
            {isMobile ? (
              // --- MOBILE: Compact, expandable/collapsible card with item-level Return/Exchange ---
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  position: "relative",
                }}
              >
                {/* Arrow at top right */}
                <Button
                  onClick={() => handleExpandToggle(order._id)}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    minWidth: 0,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    color: matteColors[900],
                    backgroundColor: matteColors[100],
                    boxShadow: "none",
                    zIndex: 2,
                    "&:hover": {
                      backgroundColor: matteColors[800],
                      color: "white",
                      boxShadow: "none",
                    },
                  }}
                >
                  {expandedOrders.includes(order._id) ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </Button>
                {/* Order Date at the top */}
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontWeight: 600, mb: 1 }}
                >
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
                {/* Product Thumbnails (always visible) */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    flex: 1,
                    mb: 2,
                  }}
                >
                  {(expandedOrders.includes(order._id)
                    ? order.items
                    : order.items.slice(0, 2)
                  ).map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "100%",
                      }}
                    >
                      <Avatar
                        src={
                          item.image && item.image !== ""
                            ? item.image
                            : PLACEHOLDER_IMAGE
                        }
                        alt={item.name}
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: "#fafafa",
                          border: "2px solid #e0e0e0",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: "text.primary",
                          flex: 1,
                          minWidth: 0,
                          pr: 1,
                          overflowWrap: "break-word",
                          whiteSpace: "normal",
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.name}
                      </Typography>
                      {expandedOrders.includes(order._id) && (
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            ml: 1,
                            mr: 1,
                            borderRadius: 8,
                            fontSize: "0.82rem",
                            px: 1.2,
                            py: 0.4,
                            minWidth: 0,
                            minHeight: 32,
                            color: matteColors[900],
                            borderColor: matteColors[900],
                            backgroundColor: "white",
                            textTransform: "none",
                            boxShadow: "none",
                            whiteSpace: "nowrap",
                            "&:hover": {
                              backgroundColor: matteColors[100],
                              borderColor: matteColors[800],
                              color: matteColors[800],
                              boxShadow: "none",
                            },
                          }}
                          onClick={() =>
                            handleOpenReturnDialog(order._id, item, idx)
                          }
                        >
                          Return/Exchange
                        </Button>
                      )}
                    </Box>
                  ))}
                </Box>
                {/* Expanded content: order info and buttons */}
                {expandedOrders.includes(order._id) && (
                  <>
                    {/* Order Info */}
                    <Box sx={{ mb: 2, mt: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: "text.secondary",
                          mb: 0.5,
                        }}
                      >
                        Order #{order._id}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 0.5 }}
                      >
                        Total: <b>₹{order.totalAmount}</b>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 0.5 }}
                      >
                        Delivery Address: {order.address}
                      </Typography>
                      <Chip
                        label={
                          order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)
                        }
                        color={getStatusColor(order.status)}
                        icon={getStatusIcon(order.status)}
                        sx={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          px: 2,
                          py: 1,
                          mt: 1,
                        }}
                      />
                    </Box>
                    {/* Action Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        flexWrap: "wrap",
                        mt: 1,
                      }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<ViewIcon />}
                        sx={{
                          fontWeight: 600,
                          minWidth: 120,
                          borderColor: matteColors[900],
                          color: matteColors[900],
                          backgroundColor: "white",
                          py: { xs: 0.7, md: 1 },
                          px: { xs: 2, md: 3 },
                          fontSize: { xs: "0.92rem", md: "0.98rem" },
                          borderRadius: 10,
                          minHeight: { xs: 36, md: 42 },
                          textTransform: "none",
                          alignSelf: { xs: "stretch", md: "center" },
                          whiteSpace: "nowrap",
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                          "&:hover": {
                            backgroundColor: matteColors[100],
                            borderColor: matteColors[800],
                            color: matteColors[800],
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                          },
                        }}
                        onClick={() => handleViewDetails(order)}
                        fullWidth={isMobile}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<ShippingIcon />}
                        sx={{
                          backgroundColor: matteColors[900],
                          color: "white",
                          fontWeight: 600,
                          minWidth: 120,
                          py: { xs: 0.7, md: 1 },
                          px: { xs: 2, md: 3 },
                          fontSize: { xs: "0.92rem", md: "0.98rem" },
                          borderRadius: 10,
                          minHeight: { xs: 36, md: 42 },
                          textTransform: "none",
                          alignSelf: { xs: "stretch", md: "center" },
                          whiteSpace: "nowrap",
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                          "&:hover": {
                            backgroundColor: matteColors[800],
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          },
                        }}
                        onClick={() => handleTrackOrder(order)}
                        fullWidth={isMobile}
                      >
                        Track Order
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<InvoiceIcon />}
                        sx={{
                          fontWeight: 600,
                          minWidth: 150,
                          borderColor: matteColors[900],
                          color: matteColors[900],
                          backgroundColor: "white",
                          py: { xs: 0.7, md: 1 },
                          px: { xs: 2, md: 3 },
                          fontSize: { xs: "0.92rem", md: "0.98rem" },
                          borderRadius: 10,
                          minHeight: { xs: 36, md: 42 },
                          textTransform: "none",
                          alignSelf: { xs: "stretch", md: "center" },
                          whiteSpace: "nowrap",
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                          "&:hover": {
                            backgroundColor: matteColors[100],
                            borderColor: matteColors[800],
                            color: matteColors[800],
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                          },
                        }}
                        onClick={() =>
                          alert("Download Invoice feature coming soon!")
                        }
                        fullWidth={isMobile}
                      >
                        Download Invoice
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<ExchangeIcon />}
                        sx={{
                          backgroundColor: matteColors[900],
                          color: "white",
                          fontWeight: 600,
                          minWidth: 170,
                          py: { xs: 0.7, md: 1 },
                          px: { xs: 2, md: 3 },
                          fontSize: { xs: "0.92rem", md: "0.98rem" },
                          borderRadius: 10,
                          minHeight: { xs: 36, md: 42 },
                          textTransform: "none",
                          alignSelf: { xs: "stretch", md: "center" },
                          whiteSpace: "nowrap",
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                          "&:hover": {
                            backgroundColor: matteColors[800],
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          },
                        }}
                        onClick={() =>
                          alert("Exchange/Return feature coming soon!")
                        }
                        fullWidth={isMobile}
                      >
                        Exchange or Return
                      </Button>
                    </Box>
                  </>
                )}
              </Paper>
            ) : (
              // --- DESKTOP: Original always-expanded card, no expand/collapse, no item-level Return/Exchange ---
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2.5, sm: 4 },
                  borderRadius: 3,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                }}
              >
                {/* Order Summary */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { sm: "center" },
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, color: "text.secondary", mb: 0.5 }}
                    >
                      Order #{order._id}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      Placed on:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      Total: <b>₹{order.totalAmount}</b>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      Delivery Address: {order.address}
                    </Typography>
                  </Box>
                  <Chip
                    label={
                      order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)
                    }
                    color={getStatusColor(order.status)}
                    icon={getStatusIcon(order.status)}
                    sx={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      px: 2,
                      py: 1,
                      mt: { xs: 2, sm: 0 },
                    }}
                  />
                </Box>
                {/* Product Thumbnails (all items) */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                    mb: 1,
                  }}
                >
                  {order.items.map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Avatar
                        src={item.image || PLACEHOLDER_IMAGE}
                        alt={item.name}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "#fafafa",
                          border: "1px solid #eee",
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: "text.primary",
                          maxWidth: 100,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ViewIcon />}
                    sx={{
                      fontWeight: 600,
                      minWidth: 120,
                      borderColor: matteColors[900],
                      color: matteColors[900],
                      backgroundColor: "white",
                      py: { xs: 0.7, md: 1 },
                      px: { xs: 2, md: 3 },
                      fontSize: { xs: "0.92rem", md: "0.98rem" },
                      borderRadius: 10,
                      minHeight: { xs: 36, md: 42 },
                      textTransform: "none",
                      alignSelf: "center",
                      whiteSpace: "nowrap",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      "&:hover": {
                        backgroundColor: matteColors[100],
                        borderColor: matteColors[800],
                        color: matteColors[800],
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                      },
                    }}
                    onClick={() => handleViewDetails(order)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<ShippingIcon />}
                    sx={{
                      backgroundColor: matteColors[900],
                      color: "white",
                      fontWeight: 600,
                      minWidth: 120,
                      py: { xs: 0.7, md: 1 },
                      px: { xs: 2, md: 3 },
                      fontSize: { xs: "0.92rem", md: "0.98rem" },
                      borderRadius: 10,
                      minHeight: { xs: 36, md: 42 },
                      textTransform: "none",
                      alignSelf: "center",
                      whiteSpace: "nowrap",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      "&:hover": {
                        backgroundColor: matteColors[800],
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      },
                    }}
                    onClick={() => handleTrackOrder(order)}
                  >
                    Track Order
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<InvoiceIcon />}
                    sx={{
                      fontWeight: 600,
                      minWidth: 150,
                      borderColor: matteColors[900],
                      color: matteColors[900],
                      backgroundColor: "white",
                      py: { xs: 0.7, md: 1 },
                      px: { xs: 2, md: 3 },
                      fontSize: { xs: "0.92rem", md: "0.98rem" },
                      borderRadius: 10,
                      minHeight: { xs: 36, md: 42 },
                      textTransform: "none",
                      alignSelf: "center",
                      whiteSpace: "nowrap",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      "&:hover": {
                        backgroundColor: matteColors[100],
                        borderColor: matteColors[800],
                        color: matteColors[800],
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                      },
                    }}
                    onClick={() =>
                      alert("Download Invoice feature coming soon!")
                    }
                  >
                    Download Invoice
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<ExchangeIcon />}
                    sx={{
                      backgroundColor: matteColors[900],
                      color: "white",
                      fontWeight: 600,
                      minWidth: 170,
                      py: { xs: 0.7, md: 1 },
                      px: { xs: 2, md: 3 },
                      fontSize: { xs: "0.92rem", md: "0.98rem" },
                      borderRadius: 10,
                      minHeight: { xs: 36, md: 42 },
                      textTransform: "none",
                      alignSelf: "center",
                      whiteSpace: "nowrap",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      "&:hover": {
                        backgroundColor: matteColors[800],
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      },
                    }}
                    onClick={() =>
                      alert("Exchange/Return feature coming soon!")
                    }
                  >
                    Exchange or Return
                  </Button>
                </Box>
              </Paper>
            )}
          </Grid>
        ))}
      </Grid>

      {/* View Details Dialog */}
      <Dialog open={detailsOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Order #{selectedOrder._id}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Placed on:{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Delivery Address: {selectedOrder.address}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Products
              </Typography>
              {selectedOrder.items.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
                >
                  <Avatar
                    src={item.image || PLACEHOLDER_IMAGE}
                    alt={item.name}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: "#fafafa",
                      border: "1px solid #eee",
                    }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Qty: {item.qty} | Price: ₹{item.price}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Total: ₹{selectedOrder.totalAmount}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, mt: 1 }}>
                Status:{" "}
                <Chip
                  label={
                    selectedOrder.status.charAt(0).toUpperCase() +
                    selectedOrder.status.slice(1)
                  }
                  color={getStatusColor(selectedOrder.status)}
                  size="small"
                />
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: matteColors[900],
              color: "white",
              fontWeight: 600,
              borderRadius: 10,
              py: { xs: 0.7, md: 1 },
              px: { xs: 2, md: 3 },
              fontSize: { xs: "0.92rem", md: "0.98rem" },
              minHeight: { xs: 36, md: 42 },
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: matteColors[800],
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Track Order Dialog */}
      <Dialog open={trackOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Track Order</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Box>
              <Stepper
                activeStep={
                  selectedOrder.status === "delivered"
                    ? 4
                    : selectedOrder.status === "shipped"
                      ? 2
                      : selectedOrder.status === "processing"
                        ? 1
                        : 0
                }
                orientation="vertical"
              >
                {trackingSteps.map((label, idx) => (
                  <Step
                    key={label}
                    completed={
                      (selectedOrder.status === "delivered" && idx <= 4) ||
                      (selectedOrder.status === "shipped" && idx <= 2) ||
                      (selectedOrder.status === "processing" && idx <= 1)
                    }
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Current Status:{" "}
                  <Chip
                    label={
                      selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)
                    }
                    color={getStatusColor(selectedOrder.status)}
                    size="small"
                  />
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: matteColors[900],
              color: "white",
              fontWeight: 600,
              borderRadius: 10,
              py: { xs: 0.7, md: 1 },
              px: { xs: 2, md: 3 },
              fontSize: { xs: "0.92rem", md: "0.98rem" },
              minHeight: { xs: 36, md: 42 },
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: matteColors[800],
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Return/Exchange Dialog */}
      <Dialog
        open={returnDialogOpen}
        onClose={handleCloseReturnDialog}
        maxWidth="xs"
        fullWidth
      >
        <form onSubmit={handleSubmitReturn}>
          <DialogTitle>Return/Exchange - {returnItem?.item?.name}</DialogTitle>
          <DialogContent dividers>
            <TextField
              select
              label="Reason"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            >
              <MenuItem value="Wrong size">Wrong size</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Not as described">Not as described</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              label="Additional Comments"
              value={returnComment}
              onChange={(e) => setReturnComment(e.target.value)}
              fullWidth
              multiline
              minRows={2}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReturnDialog} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!returnReason}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Return/Exchange request submitted!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Orders;
