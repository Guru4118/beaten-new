import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  LocationOn as LocationIcon,
  ShoppingCart as CartIcon,
  Security as SecurityIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import axios from "axios";

const Account = ({ mode }) => {
  const { user, updateProfile } = useAuth();
  const { cart } = useCart();
  const [editMode, setEditMode] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [savedCart, setSavedCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        gender: user.gender || "",
        dob: user.dob || "",
        phone: user.phone || "",
        email: user.email || "",
      });
      fetchAddresses();
      fetchSavedCart();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get("/api/user/addresses");
      setAddresses(response.data);
    } catch (err) {
      setError("Failed to fetch addresses");
    }
  };

  const fetchSavedCart = async () => {
    try {
      const response = await axios.get("/api/user/saved-cart");
      setSavedCart(response.data);
    } catch (err) {
      setError("Failed to fetch saved cart");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setSuccess("Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("/api/user/delete-account");
      // Handle logout and redirect
    } catch (err) {
      setError("Failed to delete account");
    }
  };

  const handleMoveToCart = (item) => {};

  const handleRemoveFromSaved = (item) => {};

  const setAddressDialog = (open) => {};

  const handleEditAddress = (address) => {};

  const handleDeleteAddress = (address) => {};

  return (
    <Box
      sx={{
        bgcolor: mode === "dark" ? "#181818" : "#fff",
        color: mode === "dark" ? "#fff" : "inherit",
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Profile Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  src={user?.avatar}
                  sx={{ width: 100, height: 100, mr: 2 }}
                />
                <Box>
                  <Typography variant="h5">{user?.name}</Typography>
                  <Typography color="textSecondary">
                    {user?.isPremium ? "Premium Member" : "Standard Member"}
                  </Typography>
                </Box>
              </Box>

              {editMode ? (
                <form onSubmit={handleProfileUpdate}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Select
                          value={formData.gender}
                          label="Gender"
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Date of Birth"
                        value={formData.dob}
                        onChange={(e) =>
                          setFormData({ ...formData, dob: e.target.value })
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              ) : (
                <Box>
                  <Typography variant="body1" gutterBottom>
                    <strong>Gender:</strong> {formData.gender}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Date of Birth:</strong> {formData.dob}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Phone:</strong> {formData.phone}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Email:</strong> {formData.email}
                  </Typography>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => setEditMode(true)}
                    sx={{ mt: 2 }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Membership Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Premium Membership
              </Typography>
              {user?.isPremium ? (
                <Box>
                  <Chip
                    icon={<StarIcon />}
                    label="Premium Member"
                    color="primary"
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="body1" gutterBottom>
                    <strong>Days Remaining:</strong>{" "}
                    {user?.premiumExpiry
                      ? Math.ceil(
                          (new Date(user.premiumExpiry) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        )
                      : 0}{" "}
                    days
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Amount Saved:</strong>{" "}
                    {formatPrice(user?.premiumSavings || 0)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    href="/premium"
                  >
                    Renew Membership
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body1" gutterBottom>
                    Upgrade to Premium for exclusive benefits:
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="₹250 off on every order" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Early access to new drops" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Priority shipping" />
                    </ListItem>
                  </List>
                  <Button variant="contained" color="primary" href="/premium">
                    Join Premium
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Saved Cart Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Saved Cart
              </Typography>
              {savedCart.length > 0 ? (
                <List>
                  {savedCart.map((item) => (
                    <ListItem key={item._id}>
                      <ListItemAvatar>
                        <Avatar src={item.product.images[0]} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.product.name}
                        secondary={`Size: ${item.size} | Color: ${item.color}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleMoveToCart(item)}
                        >
                          <CartIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => handleRemoveFromSaved(item)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="textSecondary">
                  No items in saved cart
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Addresses Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6">Addresses</Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => setAddressDialog(true)}
                >
                  Add New
                </Button>
              </Box>
              {addresses.length > 0 ? (
                <List>
                  {addresses.map((address) => (
                    <ListItem key={address._id}>
                      <ListItemAvatar>
                        <Avatar>
                          <LocationIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={address.name}
                        secondary={`${address.street}, ${address.city}, ${address.state} - ${address.pincode}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleEditAddress(address)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => handleDeleteAddress(address)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="textSecondary">
                  No addresses saved
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Security Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Security
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<SecurityIcon />}
                href="/change-password"
                sx={{ mr: 2 }}
              >
                Change Password
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setDeleteDialog(true)}
              >
                Delete Account
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Delete Account Dialog */}
        <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleDeleteAccount} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success/Error Alerts */}
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Container>
    </Box>
  );
};

export default Account;
