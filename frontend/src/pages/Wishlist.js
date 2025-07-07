import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Divider,
  Fade,
  Tooltip,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import { useNavigate } from "react-router-dom";

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
        minHeight: { xs: 280, md: 320 },
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        sx={{
          height: { xs: 280, md: 320 },
          width: "100%",
          objectFit: "cover",
          borderRadius: 0,
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
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              border: "3px solid #e0e0e0",
              borderTop: "3px solid #666",
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

const Wishlist = ({ mode }) => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const matteColors = {
    900: "#1a1a1a",
    800: "#2d2d2d",
    700: "#404040",
    600: "#525252",
    100: "#f5f5f5",
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        py: { xs: 0, md: 0 },
        px: 0,
        bgcolor: mode === "dark" ? "#181818" : "#fff",
        color: mode === "dark" ? "#fff" : "#181818",
        minHeight: "100vh",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          mb: 0,
          px: { xs: 2, md: 0 },
          pt: { xs: 3, md: 6 },
          pb: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2.1rem", md: "2.8rem" },
            letterSpacing: "-0.03em",
            mb: 0.5,
            color: mode === "dark" ? "#fff" : "#181818",
            textShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          My Wishlist
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: { xs: "1rem", md: "1.15rem" },
            maxWidth: "600px",
            mx: "auto",
            mb: 1.5,
            fontWeight: 400,
            letterSpacing: 0.1,
            lineHeight: 1.6,
            color: mode === "dark" ? "#fff" : "#181818",
          }}
        >
          Save your favorite items and keep track of what you love. Add items to
          your cart when you're ready to purchase.
        </Typography>
      </Box>

      <Divider sx={{ mb: 0 }} />

      {wishlist.length === 0 ? (
        <Fade in={true}>
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 6, md: 12 },
              px: 2,
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <FavoriteBorderIcon
              sx={{
                fontSize: "4rem",
                color: "text.secondary",
                opacity: 0.5,
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              color="text.secondary"
              gutterBottom
              sx={{
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                mb: 2,
              }}
            >
              Your wishlist is empty
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: "400px", mx: "auto" }}
            >
              Start adding items to your wishlist by clicking the heart icon on
              any product you like.
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
                "&:hover": {
                  backgroundColor: matteColors[800],
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                },
                transition: "all 0.3s ease",
                alignSelf: "center",
                whiteSpace: "nowrap",
                textTransform: "none",
              }}
            >
              Browse Products
            </Button>
          </Box>
        </Fade>
      ) : (
        <Grid
          container
          spacing={0}
          sx={{ margin: 0, width: "100%", padding: 0 }}
        >
          {wishlist.map((product, index) => (
            <Grid
              item
              key={product._id}
              xs={6}
              md={2.4}
              sx={{ padding: 0, margin: 0 }}
            >
              <Fade
                in={true}
                timeout={500}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    transition: "all 0.3s ease",
                    borderRadius: 0,
                    overflow: "hidden",
                    boxShadow: "none",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                      "& .MuiCardMedia-root": {
                        transform: "scale(1.05)",
                      },
                    },
                    backgroundColor: mode === "dark" ? "#232323" : "#fff",
                    color: mode === "dark" ? "#fff" : "#181818",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      width: "100%",
                      minHeight: { xs: 280, md: 320 },
                      borderRadius: 0,
                      borderColor: mode === "dark" ? "#fff" : "#181818",
                    }}
                  >
                    <ProductImage product={product} mode={mode} onClick={() => handleProductClick(product._id)} />
                    <Tooltip title="Remove from wishlist">
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                          transition: "all 0.2s ease-in-out",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          color: mode === "dark" ? "#fff" : "#181818",
                        }}
                        onClick={() => removeFromWishlist(product._id)}
                      >
                        <FavoriteIcon sx={{ color: "#ff1744" }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      borderRadius: 0,
                      color: "#fff",
                      backgroundColor : "#fff"
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                        "&:hover": { color: "primary.main" },
                        lineHeight: 1.4,
                        mb: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        color: mode === "dark" ? "#181818" : "#fff",
                      }}
                      onClick={() => handleProductClick(product._id)}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{
                        fontWeight: 700,
                        fontSize: {
                          xs: "1rem",
                          md: "1.1rem",
                          color: mode === "dark" ? "#181818" : "#fff",
                        },
                        mb: 1,
                      }}
                    >
                      {formatPrice(product.price)}
                    </Typography>
                    {product.colors && product.colors.length > 0 && (
                      <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
                        {product.colors.map((color) => (
                          <Box
                            key={color}
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              bgcolor: color.toLowerCase().replace(" ", ""),
                              border: "1px solid #ccc",
                              cursor: "pointer",
                              transition: "transform 0.2s ease",
                              "&:hover": {
                                transform: "scale(1.2)",
                              },
                              color: mode === "dark" ? "#fff" : "#181818",
                            }}
                            title={color}
                          />
                        ))}
                      </Box>
                    )}
                    <Button
                      variant="contained"
                      size={isMobile ? "large" : "medium"}
                      startIcon={<ShoppingCartIcon />}
                      fullWidth
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        mt: "auto",
                        backgroundColor:
                          mode === "dark" ? "#181818" : "#fff",
                        color: mode === "dark" ? "#fff" : "#181818",
                        py: { xs: 0.7, md: 1 },
                        px: { xs: 2, md: 3 },
                        fontSize: { xs: "0.92rem", md: "0.98rem" },
                        borderRadius: 10,
                        width: "auto",
                        minWidth: 0,
                        minHeight: { xs: 36, md: 42 },
                        "&:hover": {
                          backgroundColor:
                            mode === "dark"
                              ? matteColors[800]
                              : matteColors[800],
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        },
                        transition: "all 0.3s ease",
                        alignSelf: "center",
                        whiteSpace: "nowrap",
                        textTransform: "none",
                        fontWeight: 600,
                        "& .MuiButton-startIcon": {
                          marginRight: 0.5,
                          "& svg": {
                            fontSize: "1.1rem",
                          },
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Wishlist;
