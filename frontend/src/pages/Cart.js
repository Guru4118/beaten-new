import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingBag as ShoppingBagIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice } from "../utils/format";
import axios from "axios";

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect fill="%23f5f5f5" width="200" height="200"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="20">Image</text></svg>';

// Helper function to construct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return FALLBACK_IMAGE;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a blob URL, return as is
  if (imagePath.startsWith('blob:')) {
    return imagePath;
  }
  
  // If it's just a filename, construct the full URL
  if (imagePath && !imagePath.includes('/')) {
    return `http://localhost:5000/uploads/${imagePath}`;
  }
  
  return imagePath;
};

// Image loading state component
const ProductImage = ({ product, mode, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    const imageUrl = getImageUrl(product.image);
    setCurrentSrc(imageUrl);
    setImageLoaded(false);
    setImageError(false);
  }, [product.image]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
    setCurrentSrc(FALLBACK_IMAGE);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        minHeight: { xs: 90, md: 120 },
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: 90, md: 120 },
          height: { xs: 90, md: 120 },
          objectFit: "cover",
          borderRadius: 2,
          transition: "opacity 0.3s ease",
          opacity: imageLoaded ? 1 : 0,
        }}
        image={currentSrc}
        alt={product.name}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      {!imageLoaded && !imageError && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              border: "2px solid #e0e0e0",
              borderTop: "2px solid #666",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

const Cart = ({ mode }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuth();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wishlistDialog, setWishlistDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const matteColors = {
    900: "#1a1a1a",
    800: "#2d2d2d",
    700: "#404040",
    600: "#525252",
    100: "#f5f5f5",
  };

  // Calculate totals
  const subtotal = cart.reduce(
    (total, item) => {
      if (!item.product || typeof item.product.price !== 'number') return total;
      return total + item.product.price * item.quantity;
    },
    0
  );
  const discount = user?.isPremium ? 250 : 0;
  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal - discount + shipping;

  // Handlers
  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(
        item.product._id,
        item.size,
        item.color,
        newQuantity
      );
    } catch (err) {
      setError("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (item) => {
    try {
      await removeFromCart(item.product._id, item.size, item.color);
    } catch (err) {
      setError("Failed to remove item");
    }
  };

  const handleWishlistToggle = (item) => {
    setSelectedItem(item);
    setWishlistDialog(true);
  };

  const handleWishlistConfirm = async () => {
    try {
      const productToAdd = {
        _id: selectedItem.product._id,
        name: selectedItem.product.name,
        price: selectedItem.product.price,
        image: selectedItem.product.image,
        description: selectedItem.product.description,
        category: selectedItem.product.category,
        subCategory: selectedItem.product.subCategory,
        collection: selectedItem.product.collection,
        colors: selectedItem.product.colors,
        gender: selectedItem.product.gender,
      };

      addToWishlist(productToAdd);
      await removeFromCart(
        selectedItem.product._id,
        selectedItem.size,
        selectedItem.color
      );
      setWishlistDialog(false);
    } catch (err) {
      setError("Failed to move item to wishlist");
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
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
        <Paper
          sx={{
            p: { xs: 3, md: 6 },
            textAlign: "center",
            borderRadius: 3,
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            background:
              mode === "dark"
                ? "#232323"
                : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            color: mode === "dark" ? "#fff" : "#181818",
          }}
        >
          <ShoppingBagIcon
            sx={{
              fontSize: "4rem",
              color: "text.secondary",
              opacity: 0.5,
              mb: 2,
            }}
          />
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "2rem" },
              mb: 2,
            }}
          >
            Your cart is empty
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              maxWidth: "400px",
              mx: "auto",
              mb: 3,
            }}
          >
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button
            variant="contained"
            size={isMobile ? "large" : "medium"}
            onClick={() => navigate("/products")}
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: matteColors[900],
              color: "white",
              py: { xs: 0.7, md: 1 },
              px: { xs: 2, md: 3 },
              fontSize: { xs: "0.92rem", md: "0.98rem" },
              borderRadius: 10,
              width: "auto",
              minWidth: 0,
              minHeight: { xs: 36, md: 42 },
              fontWeight: 600,
              textTransform: "none",
              alignSelf: "center",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: matteColors[800],
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },
            }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 3, md: 6 },
        bgcolor: mode === "dark" ? "#181818" : "#fff",
        color: mode === "dark" ? "#fff" : "#181818",
        minHeight: "100vh",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.75rem", md: "2.5rem" },
            letterSpacing: "-0.02em",
            mb: 1,
          }}
        >
          Shopping Cart
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: { xs: "0.95rem", md: "1.05rem" },
            maxWidth: "600px",
            color: mode === "dark" ? "#fff" : "#181818",
          }}
        >
          Review your items and proceed to checkout. Enjoy a seamless shopping
          experience!
        </Typography>
      </Box>
      <Grid container spacing={4} alignItems="flex-start">
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{ p: { xs: 1, md: 2 }, background: "none", boxShadow: "none" }}
          >
            <Grid container spacing={2}>
              {cart.map((item, idx) => (
                (!item.product || typeof item.product.price !== 'number') ? null : (
                  <Grid
                    item
                    xs={12}
                    key={item.product._id + item.size + item.color}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        borderRadius: 3,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        mb: 2,
                        p: 1,
                        //background: mode === "dark" ? "#232323" : "#fff",
                        transition: "box-shadow 0.2s",
                        "&:hover": { boxShadow: "0 6px 24px rgba(0,0,0,0.10)" },
                      }}
                    >
                      <ProductImage product={item.product} mode={mode} />
                      <CardContent sx={{ flex: 1, p: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: "1rem", md: "1.15rem" },
                            mb: 0.5,
                          }}
                        >
                          {item.product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                         // color={mode === "dark" ? "#fff" : "#181818"}
                          sx={{ mb: 0.5 }}
                        >
                          {item.product.category}{" "}
                          {item.size && `| Size: ${item.size}`}{" "}
                          {item.color && `| Color: ${item.color}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "primary.main", mb: 1 }}
                        >
                          {formatPrice(item.product.price)} x {item.quantity}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Tooltip title="Decrease quantity">
                            <span>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleQuantityChange(item, item.quantity - 1)
                                }
                                sx={{
                                  border: "1px solid #ddd",
                                  borderRadius: 2,
                                  background: "white",
                                  color: matteColors[900],
                                  "&:hover": { background: matteColors[100] },
                                  p: 0.5,
                                }}
                                disabled={item.quantity <= 1}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <TextField
                            value={item.quantity}
                            variant="standard"
                            inputProps={{
                              readOnly: true,
                              style: {
                                textAlign: "center",
                                width: 32,
                                fontWeight: 600,
                              },
                            }}
                            sx={{ mx: 1, width: 40 }}
                          />
                          <Tooltip title="Increase quantity">
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(item, item.quantity + 1)
                              }
                              sx={{
                                border: "1px solid #ddd",
                                borderRadius: 2,
                                background: "white",
                                color: matteColors[900],
                                "&:hover": { background: matteColors[100] },
                                p: 0.5,
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Remove from cart">
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveItem(item)}
                              sx={{
                                border: "1px solid #ff1744",
                                borderRadius: 2,
                                background: "white",
                                color: "#ff1744",
                                ml: 1,
                                "&:hover": { background: matteColors[100] },
                                p: 0.5,
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title={
                              isInWishlist(item.product._id)
                                ? "Remove from wishlist"
                                : "Move to wishlist"
                            }
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleWishlistToggle(item)}
                              sx={{
                                border: "1px solid #ffd700",
                                borderRadius: 2,
                                background: "white",
                                color: "#FFD700",
                                ml: 1,
                                "&:hover": { background: matteColors[100] },
                                p: 0.5,
                              }}
                            >
                              {isInWishlist(item.product._id) ? (
                                <FavoriteIcon />
                              ) : (
                                <FavoriteBorderIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              ))}
            </Grid>
          </Paper>
        </Grid>
        {/* Summary Section */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 3,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              position: { md: "sticky" },
              top: { md: 32 },
            //  background: mode === "dark" ? "#232323" : "#fff",
              minWidth: 280,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography >
                Subtotal
              </Typography>
              <Typography>{formatPrice(subtotal)}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography >
                Shipping
              </Typography>
              <Typography>
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </Typography>
            </Box>
            {discount > 0 && (
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="success.main">Premium Discount</Typography>
                <Typography color="success.main">
                  - {formatPrice(discount)}
                </Typography>
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Total
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {formatPrice(total)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size={isMobile ? "large" : "medium"}
              fullWidth
              onClick={handleCheckout}
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor:"#181818",
                color:  "#fff" ,
                py: { xs: 0.7, md: 1 },
                px: { xs: 2, md: 3 },
                fontSize: { xs: "0.92rem", md: "0.98rem" },
                borderRadius: 10,
                width: "auto",
                minWidth: 0,
                minHeight: { xs: 36, md: 42 },
                fontWeight: 600,
                textTransform: "none",
                alignSelf: "center",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                "&:hover": {
                  backgroundColor:
                    mode === "dark" ? matteColors[800] : matteColors[800],
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                },
              }}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={clearCart}
              sx={{
                mt: 2,
                backgroundColor:"#181818",
                color: "#fff" ,
            
                py: { xs: 0.7, md: 1 },
                px: { xs: 2, md: 3 },
                fontSize: { xs: "0.92rem", md: "0.98rem" },
                borderRadius: 10,
                width: "auto",
                minWidth: 0,
                minHeight: { xs: 36, md: 42 },
                fontWeight: 600,
                textTransform: "none",
                alignSelf: "center",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                "&:hover": {
                  backgroundColor:
                    mode === "dark" ? matteColors[100] : matteColors[100],
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                },
              }}
            >
              Clear Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
      {/* Wishlist Dialog */}
      <Dialog open={wishlistDialog} onClose={() => setWishlistDialog(false)}>
        <DialogTitle>Move to Wishlist</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to move this item to your wishlist?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setWishlistDialog(false)}
            sx={{
              py: { xs: 0.7, md: 1 },
              px: { xs: 2, md: 3 },
              fontSize: { xs: "0.92rem", md: "0.98rem" },
              borderRadius: 10,
              minHeight: { xs: 36, md: 42 },
              fontWeight: 500,
              textTransform: "none",
              alignSelf: "center",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor:
                  mode === "dark" ? matteColors[100] : matteColors[100],
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleWishlistConfirm}
            color="primary"
            sx={{
              py: { xs: 0.7, md: 1 },
              px: { xs: 2, md: 3 },
              fontSize: { xs: "0.92rem", md: "0.98rem" },
              borderRadius: 10,
              minHeight: { xs: 36, md: 42 },
              fontWeight: 500,
              textTransform: "none",
              alignSelf: "center",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
              backgroundColor:
                mode === "dark" ? matteColors[900] : matteColors[900],
              color: mode === "dark" ? "#fff" : "#fff",
              "&:hover": {
                backgroundColor:
                  mode === "dark" ? matteColors[800] : matteColors[800],
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },
            }}
          >
            Move to Wishlist
          </Button>
        </DialogActions>
      </Dialog>
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default Cart;
