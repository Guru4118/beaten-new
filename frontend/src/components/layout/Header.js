import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Badge,
  useScrollTrigger,
  Slide,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Switch,
} from "@mui/material";
import {
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import HeroSearchBar from "../common/HeroSearchBar";

const pages = [
  { name: "HOME", path: "/" },
  { name: "PRODUCTS", path: "/products" },
  // { name: 'COLLECTIONS', path: '/collections' },
  { name: "PREMIUM", path: "/premium" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
];

const mobilePages = {
  main: [
    { name: "HOME", path: "/" },
    {
      name: "BEATEN EXCLUSIVE COLLECTION",
      path: "/products?collection=Beaten%20Exclusive%20Collection",
    },
    {
      name: "BEATEN SINGNATURE COLLECTION",
      path: "/products?collection=Beaten%20Signature%20Collection",
    },
    { name: "PREMIUM", path: "/premium" },
  ],
  account: [
    { name: "MY ACCOUNT", path: "/profile" },
    { name: "MY ORDERS", path: "/orders" },
    { name: "WISHLIST", path: "/wishlist" },
    { name: "RETURN / EXCHANGE", path: "/return-exchange" },
  ],
  support: [
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
    { name: "NOTIFICATIONS", path: "/alerts" },
  ],
};

// Hide on scroll down, show on scroll up
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    threshold: 100,
    disableHysteresis: true,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = ({ mode, toggleColorMode }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user, logout } = useAuth();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    window.scrollTo(0, 0);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMobileMenuClose();
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const drawer = (
    <Box
      sx={{
        position: "relative",
        textAlign: "center",
        bgcolor: "black",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onClick={handleDrawerClose}
    >
      {/* Close (Cross) Button for Mobile Drawer */}
      <IconButton
        aria-label="close drawer"
        onClick={(e) => {
          e.stopPropagation();
          handleDrawerClose();
        }}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "white",
          zIndex: 10,
          display: { xs: "flex", md: "none" },
        }}
      >
        <CloseIcon sx={{ fontSize: 32 }} />
      </IconButton>
      <List sx={{ pt: 2 }}>
        {/* Main Navigation */}
        {mobilePages.main.map((page) => (
          <ListItem
            key={page.name}
            component={RouterLink}
            to={page.path}
            onClick={handleDrawerClose}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <ListItemText
              primary={page.name}
              sx={{
                textAlign: "left",
                pl: 1,
                "& .MuiListItemText-primary": {
                  fontWeight: location.pathname === page.path ? 600 : 400,
                  letterSpacing: "0.1em",
                  fontSize: "0.95rem",
                },
              }}
            />
          </ListItem>
        ))}

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 2 }} />

        {/* Account Section */}
        <ListItem sx={{ py: 1 }}>
          <ListItemText
            primary="ACCOUNT"
            sx={{
              textAlign: "left",
              pl: 1,
              "& .MuiListItemText-primary": {
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                color: "rgba(255, 255, 255, 0.5)",
                textTransform: "uppercase",
              },
            }}
          />
        </ListItem>
        {mobilePages.account.map((page) => (
          <ListItem
            key={page.name}
            component={RouterLink}
            to={page.path}
            onClick={handleDrawerClose}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <ListItemText
              primary={page.name}
              sx={{
                textAlign: "left",
                pl: 1,
                "& .MuiListItemText-primary": {
                  fontWeight: location.pathname === page.path ? 600 : 400,
                  letterSpacing: "0.1em",
                  fontSize: "0.95rem",
                },
              }}
            />
          </ListItem>
        ))}

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 2 }} />

        {/* Support Section */}
        <ListItem sx={{ py: 1 }}>
          <ListItemText
            primary="SUPPORT"
            sx={{
              textAlign: "left",
              pl: 1,
              "& .MuiListItemText-primary": {
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                color: "rgba(255, 255, 255, 0.5)",
                textTransform: "uppercase",
              },
            }}
          />
        </ListItem>
        {mobilePages.support.map((page) => (
          <ListItem
            key={page.name}
            component={RouterLink}
            to={page.path}
            onClick={handleDrawerClose}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <ListItemText
              primary={page.name}
              sx={{
                textAlign: "left",
                pl: 1,
                "& .MuiListItemText-primary": {
                  fontWeight: location.pathname === page.path ? 600 : 400,
                  letterSpacing: "0.1em",
                  fontSize: "0.95rem",
                },
              }}
            />
          </ListItem>
        ))}

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 2 }} />

        {/* Cart Link */}
        <ListItem
          component={RouterLink}
          to="/cart"
          onClick={handleDrawerClose}
          sx={{
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <ListItemText
            primary="CART"
            sx={{
              textAlign: "left",
              pl: 1,
              "& .MuiListItemText-primary": {
                fontWeight: location.pathname === "/cart" ? 600 : 400,
                letterSpacing: "0.1em",
                fontSize: "0.95rem",
              },
            }}
          />
        </ListItem>
      </List>
      {/* Light/Dark Mode Toggler - Mobile Drawer */}
      <Box
        sx={{
          width: "100%",
          py: 2,
          display: "flex",
          alignItems: "center",
          ml: 2,
          bgcolor: "transparent",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Brightness7Icon
          sx={{ color: mode === "light" ? "#ffd600" : "#888", mr: 1 }}
        />
        <Switch
          checked={mode === "dark"}
          onChange={toggleColorMode}
          color="default"
        />
        <Brightness4Icon
          sx={{ color: mode === "dark" ? "#ffd600" : "#888", ml: 1 }}
        />
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "black",
        backdropFilter: "blur(10px)",
        boxShadow: "none",
        borderBottom: "none",
        transition: "all 0.3s ease-in-out",
        zIndex: 9999,
        top: 0,
        height: { xs: "44px", md: "64px" },
        width: { xs: "100vw", md: "auto" },
        left: 0,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 0, md: 2 },
          width: { xs: "100vw", md: "100%" },
          minWidth: { xs: "100vw", md: "0" },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: "44px", md: "64px" },
            px: { xs: 0, md: 2 },
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Mobile Menu Button */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              flex: "0 0 auto",
              zIndex: 2,
              pl: { xs: 0.5, md: 0 },
            }}
          >
            <IconButton
              size="large"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              color="inherit"
              sx={{ mr: 0, ml: 0, p: "8px" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo - Mobile (centered absolutely) */}
          <Box
            sx={{
              position: { xs: "absolute", md: "static" },
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 1,
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
                letterSpacing: "0.2em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                pointerEvents: "auto",
              }}
            >
              <img
                src="/Beaten/logo.png"
                alt="Beaten Logo"
                style={{
                  width: "6em",
                  height: "auto",
                  padding: 0,
                  margin: 0,
                  display: "block",
                }}
              />
            </Typography>
          </Box>

          {/* Logo - Desktop */}
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "white",
              textDecoration: "none",
              letterSpacing: "0.2em",
              fontSize: "1.5rem",
            }}
          >
            <img
              src="/Beaten/logo.png"
              alt="Beaten Logo"
              style={{ width: "6em", height: "auto", padding: 0, margin: 0 }}
            />
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  mx: 2,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: location.pathname === page.path ? "100%" : "0%",
                    height: "2px",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "white",
                    transition: "width 0.3s ease-in-out",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Right Icons - Desktop & Mobile (always far right) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              ml: "auto",
              flexShrink: 0,
              pr: { xs: 0.5, md: 0 },
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Search Bar - beside Wishlist Icon */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                mr: 2,
                ml: 2,
              }}
            >
              <HeroSearchBar colorMode="light" />
            </Box>
            {/* Wishlist Icon - only show on md and up */}
            <IconButton
              color="inherit"
              onClick={() => navigate("/wishlist")}
              sx={{ p: 1, display: { xs: "none", md: "flex" } }}
            >
              <FavoriteBorderIcon sx={{ fontSize: 26 }} />
            </IconButton>
            {/* Notifications Icon - always show */}
            <IconButton
              color="inherit"
              onClick={() => navigate("/alerts")}
              sx={{ p: 1 }}
            >
              <NotificationsIcon sx={{ fontSize: 26 }} />
            </IconButton>
            {/* Cart Icon - always show */}
            <IconButton
              color="inherit"
              onClick={() => navigate("/cart")}
              sx={{ p: 1 }}
            >
              <Badge badgeContent={getCartCount()} color="error">
                <CartIcon sx={{ fontSize: 26 }} />
              </Badge>
            </IconButton>
            {/* Profile Icon - only show on md and up */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transform: "scale(1.1)",
                  },
                  p: 1,
                  mr: 0,
                  pr: 0,
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                    },
                    ml: 0,
                    mr: 0,
                    pr: 0,
                  }}
                >
                  <PersonIcon />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={profileAnchorEl}
                open={Boolean(profileAnchorEl)}
                onClose={handleProfileMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    bgcolor: "black",
                    color: "white",
                    "& .MuiMenuItem-root": {
                      px: 2,
                      py: 1.5,
                      fontSize: "0.875rem",
                      letterSpacing: "0.05em",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                      },
                    },
                    "& .MuiDivider-root": {
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      my: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "black",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {user ? (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleProfileMenuClose();
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleProfileMenuClose();
                        navigate("/orders");
                      }}
                    >
                      Orders
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleProfileMenuClose();
                        navigate("/login");
                      }}
                    >
                      Login
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleProfileMenuClose();
                        navigate("/register");
                      }}
                    >
                      Register
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerClose}
        variant="temporary"
        sx={{
          display: { xs: "block", md: "none" },
          zIndex: 10000,
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          },
          "& .MuiDrawer-paper": {
            width: "100vw",
            maxWidth: "100vw",
          },
        }}
        PaperProps={{
          sx: {
            width: "100vw",
            maxWidth: "100vw",
            zIndex: 10000,
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
          },
        }}
        ModalProps={{
          keepMounted: true,
          container: document.body,
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
