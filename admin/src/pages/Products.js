import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Checkbox,
  InputAdornment,
  Card,
  CardContent,
  Stack,
  Badge,
  Avatar,
  Tabs,
  Tab,
  FormControlLabel,
  Switch,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  DialogContentText,
  Divider
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  AttachMoney as PriceIcon,
  AddPhotoAlternate as AddPhotoIcon
} from '@mui/icons-material';
import { getProducts, createProduct, bulkDeleteProducts, updateProduct, deleteProduct } from '../api/productsAdmin';
import { uploadAdminAPI } from '../api/uploadAdmin';

const categories = [
  'T-shirts',
  'Shirts',
  'Bottom Wear',
  'Sneakers',
  'Boots',
  'Sports',
  'Casual',
  'Formal',
  'cargo-pants',
  'jackets',
  'co-ord-sets',
];
const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];
const sortOptions = [
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'name_desc', label: 'Name (Z-A)' },
  { value: 'price_asc', label: 'Price (Low to High)' },
  { value: 'price_desc', label: 'Price (High to Low)' },
  { value: 'stock_asc', label: 'Stock (Low to High)' },
  { value: 'stock_desc', label: 'Stock (High to Low)' },
  { value: 'rating_desc', label: 'Rating (High to Low)' },
  { value: 'created_desc', label: 'Newest First' }
];

function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortBy, setSortBy] = useState('created_desc');
  const [view, setView] = useState('list');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [formError, setFormError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      console.log('API Response:', res);
      console.log('Products data:', res.data);
      
      const productsData = res.data.products || res.data;
      console.log('Final products array:', productsData);
      
      // Check if we have valid products with _id
      if (Array.isArray(productsData) && productsData.length > 0) {
        console.log('Sample product _id:', productsData[0]._id);
        console.log('Sample product structure:', productsData[0]);
      } else {
        console.log('No products found or invalid data structure');
      }
      
      setProducts(productsData);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      
      // Fallback mock data for testing (remove this in production)
      console.log('Using fallback mock data for testing');
      const mockProducts = [
        {
          _id: '507f1f77bcf86cd799439011',
          name: 'Test Product 1',
          sku: 'TEST-001',
          category: 'T-shirts',
          price: 29.99,
          stock: 100,
          status: 'In Stock'
        },
        {
          _id: '507f1f77bcf86cd799439012',
          name: 'Test Product 2',
          sku: 'TEST-002',
          category: 'Shirts',
          price: 49.99,
          stock: 50,
          status: 'In Stock'
        }
      ];
      setProducts(mockProducts);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(0);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setPage(0);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (product = null) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedProducts(products.map(product => product._id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    
    console.log('Selected products for bulk delete:', selectedProducts);
    console.log('Selected products type:', typeof selectedProducts);
    console.log('Selected products length:', selectedProducts.length);
    
    // Log each selected product ID
    selectedProducts.forEach((id, index) => {
      console.log(`Selected product ${index + 1}:`, id, 'Type:', typeof id);
    });
    
    try {
      console.log('Calling bulkDeleteProducts with IDs:', selectedProducts);
      await bulkDeleteProducts(selectedProducts);
      console.log('Bulk delete successful');
      await fetchProducts(); // Refresh products after bulk delete
      setSelectedProducts([]); // Clear selection
    } catch (error) {
      console.error('Failed to bulk delete products:', error);
      console.error('Error response:', error.response?.data);
      // You might want to show an error message to the user here
    }
  };

  const handleBulkUpdate = () => {
    // Implement bulk update functionality
    console.log('Updating products:', selectedProducts);
  };

  const handleExport = () => {
    const csvContent = products.map(product => 
      `${product.sku},${product.name},${product.category},${product.price},${product.stock},${product.status}`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setViewDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleSwitchToEdit = () => {
    setViewDialogOpen(false);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete._id);
      await fetchProducts();
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Failed to delete product:', error);
      setFormError('Failed to delete product.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      await updateProduct(id, updatedData);
      await fetchProducts();
      setEditDialogOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to update product:', error);
      setFormError('Failed to update product.');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    const matchesPrice = (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                        (!priceRange.max || product.price <= parseFloat(priceRange.max));
    const matchesFeatured = !showOnlyFeatured || product.featured;
    return matchesSearch && matchesCategory && matchesStatus && matchesPrice && matchesFeatured;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'stock_asc':
        return a.stock - b.stock;
      case 'stock_desc':
        return b.stock - a.stock;
      case 'rating_desc':
        return b.rating - a.rating;
      case 'created_desc':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'error';
      default:
        return 'default';
    }
  };

  const ProductCard = ({ product }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Box sx={{ position: 'relative', mb: 2 }}>
          <Avatar
            src={product.image || '/default-product.png'}
            variant="rounded"
            sx={{ width: '100%', height: 200 }}
          />
          {product.discount > 0 && (
            <Chip
              label={`${product.discount}% OFF`}
              color="error"
              size="small"
              sx={{ position: 'absolute', top: 8, right: 8 }}
            />
          )}
        </Box>
        <Typography variant="h6" gutterBottom noWrap>
          {product.name}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip
            label={product.category}
            size="small"
            icon={<CategoryIcon />}
          />
          <Chip
            label={product.status}
            color={getStatusColor(product.status)}
            size="small"
            icon={<InventoryIcon />}
          />
        </Stack>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          SKU: {product.sku}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" color="primary">
            ₹{product.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => handleViewProduct(product)}>
              <ViewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEditProduct(product)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton 
              size="small" 
              color="error"
              onClick={() => handleDeleteClick(product)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );

  const ImageUpload = ({ images, onImagesChange }) => {
    const handleImageUpload = (event) => {
      const files = Array.from(event.target.files);
      const newImages = files.map(file => ({
        url: URL.createObjectURL(file),
        file: file,
        name: file.name
      }));
      onImagesChange([...images, ...newImages]);
    };

    const handleRemoveImage = (index) => {
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
    };

    return (
      <Box>
        <Box sx={{ mb: 2 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            multiple
            onChange={handleImageUpload}
          />
          <label htmlFor="image-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadIcon />}
              fullWidth
            >
              Upload Images
            </Button>
          </label>
        </Box>
        {images.length > 0 && (
          <ImageList sx={{ width: '100%', height: 200 }} cols={3} rowHeight={164}>
            {images.map((image, index) => (
              <ImageListItem key={index}>
                <img
                  src={image.url}
                  alt={`Product ${index + 1}`}
                  loading="lazy"
                  style={{ height: '100%', objectFit: 'cover' }}
                />
                <ImageListItemBar
                  position="top"
                  actionIcon={
                    <IconButton
                      sx={{ color: 'white' }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
            <ImageListItem>
              <label htmlFor="image-upload">
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed',
                    borderColor: 'divider',
                    cursor: 'pointer'
                  }}
                >
                  <AddPhotoIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                </Box>
              </label>
            </ImageListItem>
          </ImageList>
        )}
      </Box>
    );
  };

  const ViewProductDialog = ({ open, onClose, product }) => {
    if (!product) return null;

    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Product Details
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ position: 'relative', width: '100%', height: 300 }}>
                <img
                  src={product.image || '/default-product.png'}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 8
                  }}
                />
                {product.discount > 0 && (
                  <Chip
                    label={`${product.discount}% OFF`}
                    color="error"
                    size="small"
                    sx={{ position: 'absolute', top: 16, right: 16 }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Product Name
              </Typography>
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                SKU
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product.sku}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Price
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                ₹{product.price.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Stock
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product.stock} units
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Category
              </Typography>
              <Chip
                label={product.category}
                size="small"
                icon={<CategoryIcon />}
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Chip
                label={product.status}
                color={getStatusColor(product.status)}
                size="small"
                icon={<InventoryIcon />}
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Additional Information
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Stack direction="row" spacing={2}>
                  <Chip
                    label={`Rating: ${product.rating}`}
                    size="small"
                  />
                  <Chip
                    label={`${product.reviews} Reviews`}
                    size="small"
                  />
                  <Chip
                    label={product.featured ? 'Featured' : 'Regular'}
                    color={product.featured ? 'primary' : 'default'}
                    size="small"
                  />
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button
            variant="contained"
            onClick={handleSwitchToEdit}
            startIcon={<EditIcon />}
          >
            Edit Product
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const EditProductDialog = ({ open, onClose, product = null }) => {
    const [formData, setFormData] = useState({
      name: product?.name || '',
      sku: product?.sku || '',
      price: product?.price || '',
      stock: product?.stock || '',
      category: product?.category || '',
      status: product?.status || 'Active',
      description: product?.description || '',
      images: product?.images || []
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleImagesChange = (newImages) => {
      setFormData(prev => ({
        ...prev,
        images: newImages
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormError('');
      if (!formData.name || !formData.price || !formData.sku || !formData.stock || !formData.category || !formData.status) {
        setFormError('Please fill in all required fields.');
        return;
      }
      let imageUrl = '';
      if (formData.images && formData.images.length > 0) {
        const firstImage = formData.images[0];
        if (firstImage.file) {
          const uploadRes = await uploadAdminAPI.uploadImage(firstImage.file);
          imageUrl = uploadRes.data.imageUrl;
          if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `http://localhost:5000${imageUrl}`;
          }
        } else if (firstImage.url) {
          imageUrl = firstImage.url;
        } else {
          imageUrl = firstImage;
        }
      }
      const payload = {
        ...formData,
        image: imageUrl,
      };
      delete payload.images;
      if (!imageUrl) {
        setFormError('Please upload/select an image before saving the product.');
        return;
      }
      if (!product) {
        await createProduct(payload);
        await fetchProducts();
      onClose();
      } else {
        await handleUpdateProduct(product._id, payload);
      }
    };

    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {product ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {formError && (
              <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>
            )}
            <Grid container spacing={2}>
              {/* Product Images Section */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Product Images
                </Typography>
                <ImageUpload
                  images={formData.images}
                  onImagesChange={handleImagesChange}
                />
                {/* Image Preview */}
                {formData.images && formData.images.length > 0 && (
                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    {formData.images.map((img, idx) => {
                      let url = img.url || img;
                      if (url && !url.startsWith('http')) {
                        url = `http://localhost:5000${url}`;
                      }
                      return (
                        <img
                          key={idx}
                          src={url}
                          alt={`Preview ${idx + 1}`}
                          style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8, border: '1px solid #eee' }}
                        />
                      );
                    })}
                  </Box>
                )}
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Product Details Section */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Product Details
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    label="Category"
                    onChange={handleChange}
                    required
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                  required
                />
              </Grid>

              {/* Inventory Section */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Inventory
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="SKU"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    label="Status"
                    onChange={handleChange}
                    required
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  const renderTableActions = (product) => (
    <TableCell>
      <Tooltip title="View Details">
        <IconButton size="small" onClick={() => handleViewProduct(product)}>
          <ViewIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton size="small" onClick={() => handleEditProduct(product)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton 
          size="small" 
          color="error"
          onClick={() => handleDeleteClick(product)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </TableCell>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Products
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={() => {/* Implement import */}}
          >
            Import
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      {/* Debug Section - Remove this in production */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" gutterBottom>
          🐛 Debug Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Products Count: {products.length}</Typography>
            <Typography variant="subtitle2">Selected Products: {selectedProducts.length}</Typography>
            <Typography variant="subtitle2">Selected IDs: {JSON.stringify(selectedProducts)}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Sample Product IDs:</Typography>
            {products.slice(0, 3).map((product, index) => (
              <Typography key={index} variant="body2" color="text.secondary">
                {index + 1}. {product.name}: {product._id}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Paper>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Status"
                onChange={handleStatusChange}
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={handleSortChange}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => setShowFilters(!showFilters)}
            >
              More Filters
            </Button>
          </Grid>
        </Grid>

        {showFilters && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Min Price"
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  InputProps={{ startAdornment: <PriceIcon /> }}
                />
                <TextField
                  label="Max Price"
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  InputProps={{ startAdornment: <PriceIcon /> }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showOnlyFeatured}
                    onChange={(e) => setShowOnlyFeatured(e.target.checked)}
                  />
                }
                label="Show Featured Only"
              />
            </Grid>
          </Grid>
        )}
      </Paper>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography>
              {selectedProducts.length} products selected
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={handleBulkDelete}
            >
              Delete Selected
            </Button>
            <Button
              variant="outlined"
              onClick={handleBulkUpdate}
            >
              Update Selected
            </Button>
          </Box>
        </Paper>
      )}

      {/* View Toggle */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={view}
          onChange={(e, newValue) => setView(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab value="list" label="List View" />
          <Tab value="grid" label="Grid View" />
        </Tabs>
      </Box>

      {/* Products Display */}
      {view === 'list' ? (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProducts.length === filteredProducts.length}
                      indeterminate={selectedProducts.length > 0 && selectedProducts.length < filteredProducts.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <TableRow key={product._id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedProducts.includes(product._id)}
                          onChange={() => handleSelectProduct(product._id)}
                        />
                      </TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          ₹{product.price.toFixed(2)}
                          {product.discount > 0 && (
                            <Chip
                              label={`${product.discount}% OFF`}
                              color="error"
                              size="small"
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Chip
                          label={product.status}
                          color={getStatusColor(product.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {product.rating}
                          <Typography variant="body2" color="text.secondary">
                            ({product.reviews})
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {renderTableActions(product)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
      )}

      {/* Product Dialog */}
      <ViewProductDialog
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        product={selectedProduct}
      />
      <EditProductDialog
        open={openDialog}
        onClose={handleCloseDialog}
        product={null}
      />
      <EditProductDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        product={selectedProduct}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Products; 