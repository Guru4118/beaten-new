import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  IconButton,
  TextField,
  Avatar,
  Rating,
  Divider,
  Paper,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Star as StarIcon,
  NavigateNext as NavigateNextIcon,
  FavoriteBorder as FavoriteBorderIcon,
  LocalShippingOutlined as ShippingIcon,
  CheckCircleOutline as CheckIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { useWishlist } from "../context/WishlistContext";
import { productsAPI } from '../api';

const matteColors = {
  900: "#1a1a1a",
  800: "#2d2d2d",
  700: "#404040",
  600: "#525252",
  100: "#f5f5f5",
};

// Helper function to construct image URL
const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect fill="%23f5f5f5" width="200" height="200"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="20">Image</text></svg>';

const getImageUrl = (imagePath) => {
  if (!imagePath) return FALLBACK_IMAGE;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  if (imagePath.startsWith('blob:')) {
    return imagePath;
  }
  if (imagePath && !imagePath.includes('/')) {
    return `http://localhost:5000/uploads/${imagePath}`;
  }
  return imagePath;
};

const ProductDetail = ({ mode }) => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const images = product?.images && product.images.length > 0
    ? product.images
    : product?.image
      ? [product.image]
      : [];
  const mainImage = getImageUrl(images[mainImageIndex] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes ? product.sizes[0] : null
  );
  const [selectedColor, setSelectedColor] = useState(
    product?.colors ? product.colors[0] : null
  );
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = isInWishlist(productId);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({ ...product, _id: productId });
    }
  };

  const handlePincodeCheck = () => {
    // Dummy delivery info
    if (pincode.length === 6) {
      setDeliveryInfo({
        date: "Thursday, 24 Jul",
        cod: "Available",
      });
    } else {
      setDeliveryInfo(null);
    }
  };

  // Move reviews to state for dynamic updates
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      rating: 5,
      date: "2024-03-15",
      comment:
        "Excellent quality and perfect fit. The material is premium and the stitching is impeccable. Highly recommended!",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      rating: 4,
      date: "2024-03-10",
      comment:
        "Great product, very comfortable. The only reason for 4 stars is that the color is slightly different from the picture.",
    },
    {
      id: 3,
      user: {
        name: "Mike Johnson",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      rating: 5,
      date: "2024-03-05",
      comment:
        "Absolutely love this product! The quality is outstanding and it exceeded my expectations.",
    },
  ]);

  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!userRating || !userReview.trim()) return;
    // Add new review to the top
    setReviews([
      {
        id: Date.now(),
        user: {
          name: "You", // Replace with real user name if available
          avatar: "https://i.pravatar.cc/150?img=4", // Replace with real user avatar if available
        },
        rating: userRating,
        date: new Date().toISOString(),
        comment: userReview.trim(),
      },
      ...reviews,
    ]);
    setUserRating(0);
    setUserReview("");
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 2000);
  };

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  useEffect(() => {
    setLoading(true);
    productsAPI.getProduct(productId)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        setProduct(null);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="h5">Loading...</Typography>
        </Container>
      </Box>
    );
  }
  if (!product) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="h5">Product not found</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: mode === "dark" ? "#181818" : "#fff",
        color: mode === "dark" ? "#fff" : "inherit",
        minHeight: "100vh",
        width: "100%",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Container maxWidth="xl" disableGutters={isMobile}>
        <Grid container spacing={{ xs: 2, md: 6 }}>
          {/* Image Gallery (Left) */}
          <Grid item xs={12} md={7}>
            <Box sx={{ position: "sticky", top: 100, ml: 0, p: 0, m: 0 }}>
              <Box
                sx={{
                  position: "relative",
                  mb: 2,
                  ml: 0,
                  p: 0,
                  m: 0,
                  border: "1px solid #eee",
                  borderRadius: { xs: 0, md: 2 },
                  overflow: "hidden",
                }}
              >
                {/* Left Arrow */}
                {images.length > 1 && (
                  <IconButton
                    onClick={() =>
                      setMainImageIndex(
                        (prev) =>
                          (prev - 1 + images.length) % images.length
                      )
                    }
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: 8,
                      zIndex: 2,
                      background: "rgba(0,0,0,0.3)",
                      color: "#fff",
                      transform: "translateY(-50%)",
                      display: { xs: "flex", md: "flex" },
                      "&:hover": { background: "rgba(0,0,0,0.5)" },
                    }}
                  >
                    <span style={{ fontSize: 28, fontWeight: 700 }}>
                      &#8592;
                    </span>
                  </IconButton>
                )}
                {/* Main Image */}
                <Box
                  component="img"
                  src={mainImage}
                  alt={product.name}
                  sx={{
                    width: { xs: "100vw", md: "100%" },
                    maxWidth: { xs: "100vw", md: "100%" },
                    height: "auto",
                    aspectRatio: { xs: "1/1", md: "0.8/1" },
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                    padding: { xs: 0, md: 0 },
                    marginLeft: { xs: 0, md: "auto" },
                    marginRight: { xs: 0, md: "auto" },
                  }}
                />
                {/* Right Arrow */}
                {images.length > 1 && (
                  <IconButton
                    onClick={() =>
                      setMainImageIndex(
                        (prev) => (prev + 1) % images.length
                      )
                    }
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 8,
                      zIndex: 2,
                      background: "rgba(0,0,0,0.3)",
                      color: "#fff",
                      transform: "translateY(-50%)",
                      display: { xs: "flex", md: "flex" },
                      "&:hover": { background: "rgba(0,0,0,0.5)" },
                    }}
                  >
                    <span style={{ fontSize: 28, fontWeight: 700 }}>
                      &#8594;
                    </span>
                  </IconButton>
                )}
              </Box>
              <Grid container spacing={1}>
                {images.map((img, index) => (
                  <Grid item xs={3} key={index}>
                    <Box
                      onClick={() => setMainImageIndex(index)}
                      sx={{
                        cursor: "pointer",
                        border:
                          mainImageIndex === index
                            ? `2px solid ${matteColors[900]}`
                            : "2px solid transparent",
                        borderRadius: 2,
                        overflow: "hidden",
                        transition: "border-color 0.3s ease",
                      }}
                    >
                      <Box
                        component="img"
                        src={getImageUrl(img)}
                        alt={`Thumbnail ${index + 1}`}
                        sx={{ width: '100%', height: 60, objectFit: 'cover', display: 'block' }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Product Info (Right) */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: "sticky",
                top: 100,
                color: mode === "dark" ? "#fff" : "inherit",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 600, mb: 1.5, letterSpacing: "-0.02em" }}
              >
                {product.name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={averageRating} precision={0.5} readOnly />
                <Typography
                  sx={{ ml: 1, color: mode === "dark" ? "#fff" : "inherit" }}
                >
                  ({reviews.length} reviews)
                </Typography>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: mode === "dark" ? "#fff" : matteColors[800],
                }}
              >
                ₹{product.price.toLocaleString()}
              </Typography>

              {/* Color Selector */}
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontWeight: 500, mb: 1 }}>
                  Color: {selectedColor}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {product.colors.map((color) => (
                    <Chip
                      key={color}
                      label={color}
                      onClick={() => setSelectedColor(color)}
                      variant={selectedColor === color ? "filled" : "outlined"}
                      sx={{
                        cursor: "pointer",
                        borderColor: mode === "dark" ? "#fff" : "#181818",
                        backgroundColor:
                          selectedColor === color
                            ? mode === "dark"
                              ? "#fff"
                              : "#181818"
                            : "transparent",
                        color:
                          selectedColor === color
                            ? mode === "dark"
                              ? "#181818"
                              : "#fff"
                            : mode === "dark"
                              ? "#fff"
                              : "#181818",
                        "&:hover": {
                          backgroundColor:
                            selectedColor === color
                              ? mode === "dark"
                                ? "#181818"
                                : "#fff"
                              : mode === "dark"
                                ? "#222"
                                : "#f5f5f5",
                          color:
                            selectedColor === color
                              ? mode === "dark"
                                ? "#fff"
                                : "#181818"
                              : undefined,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Size Selector */}
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontWeight: 500, mb: 1 }}>Size</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {product.sizes.map((size) => (
                    <Chip
                      key={size}
                      label={size}
                      onClick={() => setSelectedSize(size)}
                      variant={selectedSize === size ? "filled" : "outlined"}
                      sx={{
                        cursor: "pointer",
                        minWidth: "48px",
                        borderColor: mode === "dark" ? "#fff" : "#181818",
                        backgroundColor:
                          selectedSize === size
                            ? mode === "dark"
                              ? "#fff"
                              : "#181818"
                            : "transparent",
                        color:
                          selectedSize === size
                            ? mode === "dark"
                              ? "#181818"
                              : "#fff"
                            : mode === "dark"
                              ? "#fff"
                              : "#181818",
                        "&:hover": {
                          backgroundColor:
                            selectedSize === size
                              ? mode === "dark"
                                ? "#181818"
                                : "#fff"
                              : mode === "dark"
                                ? "#222"
                                : "#f5f5f5",
                          color:
                            selectedSize === size
                              ? mode === "dark"
                                ? "#fff"
                                : "#181818"
                              : undefined,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Quantity & Add to Cart */}
              <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
                <Grid item xs={5} sm={4}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: `1px solid ${mode === "dark" ? "#fff" : "#181818"}`,
                      borderRadius: 2,
                      justifyContent: "space-between",
                    }}
                  >
                    <IconButton
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      size="small"
                      sx={{
                        color: mode === "dark" ? "#fff" : "inherit",
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ fontWeight: 600 }}>{quantity}</Typography>
                    <IconButton
                      onClick={() => setQuantity((q) => q + 1)}
                      size="small"
                      sx={{
                        color: mode === "dark" ? "#fff" : "inherit",
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={7} sm={8}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={async () => {
                      // Always store only the filename in cart
                      let imageFilename = product.image;
                      if (imageFilename && imageFilename.startsWith('http')) {
                        const parts = imageFilename.split('/');
                        imageFilename = parts[parts.length - 1];
                      }
                      const cartProduct = {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        image: imageFilename,
                        description: product.description,
                        category: product.category,
                        subCategory: product.subCategory,
                        collection: product.collection,
                        colors: product.colors,
                        gender: product.gender,
                      };
                      await addToCart(cartProduct, quantity, selectedSize, selectedColor);
                      navigate("/cart");
                    }}
                    sx={{
                      py: 1.5,
                      backgroundColor: mode === "dark" ? "#fff" : "#181818",
                      color: mode === "dark" ? "#181818" : "#fff",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: mode === "dark" ? "#181818" : "#fff",
                        color: mode === "dark" ? "#fff" : "#181818",
                      },
                      boxShadow: "none",
                    }}
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>

              {/* Wishlist Button */}
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FavoriteBorderIcon />}
                onClick={handleWishlistToggle}
                sx={{
                  py: 1.5,
                  borderColor: mode === "dark" ? "#fff" : "#181818",
                  color: mode === "dark" ? "#fff" : "#181818",
                  borderRadius: 2,
                  mb: 3,
                  background: "none",
                  "&:hover": {
                    background: mode === "dark" ? "#222" : "#f5f5f5",
                  },
                }}
              >
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>

              {/* Delivery Pincode Check */}
              <Box
                sx={{
                  border: `1px solid ${mode === "dark" ? "#fff" : "#181818"}`,
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography sx={{ fontWeight: 600, mb: 1 }}>
                  Delivery Options
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    color: mode === "dark" ? "#fff" : "inherit",
                    borderColor: mode === "dark" ? "#fff" : "#181818",
                  }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    InputProps={{
                      style: {
                        color: mode === "dark" ? "#fff" : "#181818",
                        borderColor: mode === "dark" ? "#fff" : "#181818",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: mode === "dark" ? "#fff" : "#181818",
                        },
                        "&:hover fieldset": {
                          borderColor: mode === "dark" ? "#fff" : "#181818",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: mode === "dark" ? "#fff" : "#181818",
                        },
                        color: mode === "dark" ? "#fff" : "#181818",
                      },
                      input: {
                        color: mode === "dark" ? "#fff" : "#181818",
                        "::placeholder": {
                          color: mode === "dark" ? "#fff" : "#181818",
                          opacity: 1,
                        },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handlePincodeCheck}
                    sx={{
                      color: mode === "dark" ? "#181818" : "#fff",
                      //  borderColor: mode === "dark" ? "#fff" : "#181818",
                      backgroundColor: mode === "dark" ? "#fff" : "#181818",
                    }}
                  >
                    Check
                  </Button>
                </Box>
                {deliveryInfo && (
                  <Box
                    sx={{
                      mt: 1.5,
                      display: "flex",
                      alignItems: "center",
                      color: "green",
                    }}
                  >
                    <CheckIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      Delivery by {deliveryInfo.date}. COD {deliveryInfo.cod}.
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Product Details Accordion */}
              <Box sx={{ mt: 3 }}>
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{ color: mode === "dark" ? "#fff" : "#181818" }}
                      />
                    }
                    sx={{ bgcolor: mode === "dark" ? "#232323" : undefined }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: mode === "dark" ? "#fff" : "#181818",
                      }}
                    >
                      Product Description
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ bgcolor: mode === "dark" ? "#232323" : undefined }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: mode === "dark" ? "#fff" : "#181818" }}
                    >
                      {product.description}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{ color: mode === "dark" ? "#fff" : "#181818" }}
                      />
                    }
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#181818",
                        //backgroundColor: mode === "dark" ? "#181818" : "#fff",
                      }}
                    >
                      Material & Care
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{
                        color: "#181818",
                      }}
                      variant="body2"
                    >
                      {product.material}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>

              {cartMessage && (
                <Typography color="success.main" sx={{ mt: 1, mb: 1, textAlign: 'center' }}>{cartMessage}</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;
