import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Layout from "./components/layout/Layout";
import BottomNav from "./components/layout/BottomNav";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NewsScroller from "./components/common/NewsScroller";
import { Box } from "@mui/material";
import ScrollToTop from "./components/ScrollToTop";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Help from "./pages/Help";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import SizeGuide from "./pages/SizeGuide";
import Payment from "./pages/Payment";

// Import Roboto font from Google Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Notifies from "./pages/Notifies";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 500,
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 500,
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
    },
    body1: {
      fontWeight: 400,
      letterSpacing: "0.01em",
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      letterSpacing: "0.01em",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 500,
      letterSpacing: "0.05em",
      textTransform: "none",
      lineHeight: 1.75,
    },
    subtitle1: {
      fontWeight: 400,
      letterSpacing: "0.01em",
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 500,
      letterSpacing: "0.01em",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: [
            "Roboto",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Arial",
            "sans-serif",
          ].join(","),
        },
      },
    },
  },
});

const App = () => {
  // Add dark/light mode state here
  const [mode, setMode] = useState("light");
  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  console.log("Header mode:", mode);
  console.log("App mode:", mode);

  const handleMoveToCart = (item) => {
    // TODO: implement move to cart logic
  };

  const handleRemoveFromSaved = (item) => {
    // TODO: implement remove from saved logic
  };

  const setAddressDialog = (open) => {
    // TODO: implement address dialog logic
  };

  const handleEditAddress = (address) => {
    // TODO: implement edit address logic
  };

  const handleDeleteAddress = (address) => {
    // TODO: implement delete address logic
  };

  return (
    <Router>
      <ScrollToTop />
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <NewsScroller />
                {/* Pass mode and toggleColorMode to Header */}
                <Header mode={mode} toggleColorMode={toggleColorMode} />
                <Box
                  sx={{
                    pb: { xs: 10, md: 0 },
                    pt: { xs: 0, md: 0 },
                    bgcolor: mode === "dark" ? "#181818" : "white",
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      {/* Public Routes */}
                      <Route index element={<Home mode={mode} />} />
                      <Route
                        path="products"
                        element={<Products mode={mode} />}
                      />
                      <Route
                        path="products/:productId"
                        element={<ProductDetail mode={mode} />}
                      />
                      <Route
                        path="collections"
                        element={<Collections mode={mode} />}
                      />
                      <Route
                        path="collections/:id"
                        element={<Collections mode={mode} />}
                      />
                      <Route path="cart" element={<Cart mode={mode} />} />
                      <Route path="login" element={<Login mode={mode} />} />
                      <Route
                        path="register"
                        element={<Register mode={mode} />}
                      />
                      <Route
                        path="forgot-password"
                        element={<ForgotPassword mode={mode} />}
                      />
                      <Route
                        path="reset-password"
                        element={<ResetPassword mode={mode} />}
                      />
                      <Route path="premium" element={<Premium mode={mode} />} />
                      <Route path="about" element={<About mode={mode} />} />
                      <Route path="contact" element={<Contact mode={mode} />} />
                      <Route
                        path="notifies"
                        element={<Notifies mode={mode} />}
                      />
                      <Route
                        path="wishlist"
                        element={<Wishlist mode={mode} />}
                      />
                      <Route path="privacy" element={<Privacy mode={mode} />} />
                      <Route path="terms" element={<Terms mode={mode} />} />
                      <Route path="help" element={<Help mode={mode} />} />
                      <Route
                        path="shipping"
                        element={<Shipping mode={mode} />}
                      />
                      <Route path="returns" element={<Returns mode={mode} />} />
                      <Route
                        path="size-guide"
                        element={<SizeGuide mode={mode} />}
                      />
                      <Route path="payment" element={<Payment mode={mode} />} />
                      <Route path="account" element={<Account mode={mode} />} />
                      <Route
                        path="checkout"
                        element={<Checkout mode={mode} />}
                      />

                      {/* Previously Protected Routes - Now Public */}
                      <Route path="profile" element={<Profile mode={mode} />} />
                      <Route
                        path="change-password"
                        element={<ChangePassword mode={mode} />}
                      />
                      <Route path="orders" element={<Orders mode={mode} />} />
                      <Route
                        path="order/"
                        element={<OrderDetails mode={mode} />}
                      />

                      {/* 404 Route */}
                      <Route path="*" element={<NotFound mode={mode} />} />
                    </Route>
                  </Routes>
                </Box>
                <BottomNav />
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
