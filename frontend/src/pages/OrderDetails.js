import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  LocalShipping as ShippingIcon,
  CheckCircle as DeliveredIcon,
  Cancel as CancelledIcon,
  ArrowBack as BackIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "processing":
      return "info";
    case "shipped":
      return "primary";
    case "delivered":
      return "success";
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

const OrderDetails = ({ mode }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch order details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!user) {
    navigate("/login");
    return null;
  }

  if (loading) {
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
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
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
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!order) {
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
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5" sx={{ color: mode === "dark" ? "#fff" : "#181818",}} gutterBottom>
            Order not found
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/orders")}
            sx={{
              bgcolor: mode === "dark" ? "#181818" : "#fff",
              color: mode === "dark" ? "#fff" : "#181818",
            }}
          >
            Back to Orders
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
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate("/orders")}
          sx={{ mb: 2 }}
        >
          Back to Orders
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          Order Details
        </Typography>
        <Chip
          label={order.status}
          color={getStatusColor(order.status)}
          icon={getStatusIcon(order.status)}
          sx={{ mb: 2 }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Order Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <List>
              {order.items.map((item) => (
                <React.Fragment
                  key={`${item.product._id}-${item.size}-${item.color}`}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={item.product.images[0]}
                        alt={item.product.name}
                        sx={{ width: 80, height: 80, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.product.name}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Size: {item.size} | Color: {item.color}
                          </Typography>
                          <br />
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            Quantity: {item.quantity} × ₹{item.price}
                          </Typography>
                        </>
                      }
                    />
                    <Typography variant="subtitle1">
                      ₹{item.quantity * item.price}
                    </Typography>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Subtotal</Typography>
              <Typography>₹{order.totalAmount}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Shipping</Typography>
              <Typography>Free</Typography>
            </Box>
            {order.discount > 0 && (
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Discount</Typography>
                <Typography color="error">-₹{order.discount}</Typography>
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">
                ₹{order.totalAmount - order.discount}
              </Typography>
            </Box>
          </Paper>

          {/* Shipping Address */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Typography variant="body2" paragraph>
              {order.shippingAddress.fullName}
            </Typography>
            <Typography variant="body2" paragraph>
              {order.shippingAddress.address}
            </Typography>
            <Typography variant="body2" paragraph>
              {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
              {order.shippingAddress.pincode}
            </Typography>
            <Typography variant="body2" paragraph>
              Phone: {order.shippingAddress.phone}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetails;
