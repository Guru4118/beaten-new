import React, { useState } from 'react';
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
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  DialogContentText,
  ListItemIcon
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Download as DownloadIcon,
  LocalShipping as LocalShippingIcon,
  Payment as PaymentIcon,
  Person as CustomerIcon,
  ShoppingCart as CartIcon,
  Receipt as ReceiptIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Update as UpdateIcon,
  History as HistoryIcon,
  PendingActions as PendingIcon,
  Sync as ProcessingIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as PendingTimeIcon,
  Inventory as ProcessingInventoryIcon,
  LocalShipping as ShippedIcon,
  TaskAlt as DeliveredIcon,
  Cancel as CancelledIcon,
  FileDownload as ExportIcon,
  Visibility as ViewDetailsIcon,
  Edit as EditStatusIcon,
  History as ViewHistoryIcon
} from '@mui/icons-material';

// Static data
const orders = [
  {
    _id: '1',
    orderNumber: 'ORD-2024-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900'
    },
    date: '2024-03-15',
    total: 299.97,
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    shippingAddress: '123 Main St, City, Country',
    items: [
      {
        product: 'Classic White Sneakers',
        quantity: 2,
        price: 89.99,
        image: '/products/sneakers-1.jpg'
      },
      {
        product: 'Black Leather Boots',
        quantity: 1,
        price: 119.99,
        image: '/products/boots-1.jpg'
      }
    ],
    trackingNumber: 'TRK123456789',
    notes: 'Handle with care',
    createdAt: '2024-03-15T10:30:00Z'
  },
  {
    _id: '2',
    orderNumber: 'ORD-2024-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 8901'
    },
    date: '2024-03-14',
    total: 149.99,
    status: 'Processing',
    paymentMethod: 'PayPal',
    shippingAddress: '456 Oak St, City, Country',
    items: [
      {
        product: 'Running Shoes',
        quantity: 1,
        price: 149.99,
        image: '/products/running-1.jpg'
      }
    ],
    trackingNumber: null,
    notes: '',
    createdAt: '2024-03-14T15:45:00Z'
  },
  {
    _id: '3',
    orderNumber: 'ORD-2024-003',
    customer: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 234 567 8902'
    },
    date: '2024-03-13',
    total: 79.99,
    status: 'Shipped',
    paymentMethod: 'Credit Card',
    shippingAddress: '789 Pine St, City, Country',
    items: [
      {
        product: 'Casual Loafers',
        quantity: 1,
        price: 79.99,
        image: '/products/loafers-1.jpg'
      }
    ],
    trackingNumber: 'TRK987654321',
    notes: 'Gift wrapping requested',
    createdAt: '2024-03-13T09:15:00Z'
  },
  {
    _id: '4',
    orderNumber: 'ORD-2024-004',
    customer: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1 234 567 8903'
    },
    date: '2024-03-12',
    total: 259.98,
    status: 'Pending',
    paymentMethod: 'Bank Transfer',
    shippingAddress: '321 Elm St, City, Country',
    items: [
      {
        product: 'Formal Oxfords',
        quantity: 2,
        price: 129.99,
        image: '/products/oxfords-1.jpg'
      }
    ],
    trackingNumber: null,
    notes: '',
    createdAt: '2024-03-12T14:20:00Z'
  },
  {
    _id: '5',
    orderNumber: 'ORD-2024-005',
    customer: {
      name: 'David Brown',
      email: 'david@example.com',
      phone: '+1 234 567 8904'
    },
    date: '2024-03-11',
    total: 449.97,
    status: 'Cancelled',
    paymentMethod: 'Credit Card',
    shippingAddress: '654 Maple St, City, Country',
    items: [
      {
        product: 'Black Leather Boots',
        quantity: 3,
        price: 149.99,
        image: '/products/boots-1.jpg'
      }
    ],
    trackingNumber: null,
    notes: 'Customer requested cancellation',
    createdAt: '2024-03-11T11:10:00Z'
  }
];

const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const sortOptions = [
  { value: 'date_desc', label: 'Newest First' },
  { value: 'date_asc', label: 'Oldest First' },
  { value: 'total_desc', label: 'Highest Amount' },
  { value: 'total_asc', label: 'Lowest Amount' },
  { value: 'status', label: 'Status' }
];

function Orders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortBy, setSortBy] = useState('date_desc');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [totalRange, setTotalRange] = useState({ min: '', max: '' });
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  // Define orderStatuses inside the component to access the imported icons
  const orderStatuses = [
    { value: 'Pending', color: 'warning', icon: <PendingTimeIcon /> },
    { value: 'Processing', color: 'info', icon: <ProcessingInventoryIcon /> },
    { value: 'Shipped', color: 'primary', icon: <ShippedIcon /> },
    { value: 'Delivered', color: 'success', icon: <DeliveredIcon /> },
    { value: 'Cancelled', color: 'error', icon: <CancelledIcon /> },
  ];

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

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setPage(0);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (order = null) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleExport = () => {
    const csvContent = filteredOrders.map(order => 
      `${order.orderNumber},${order.customer.name},${order.date},${order.total},${order.status},${order.paymentMethod}`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handlePrintInvoice = (order) => {
    // Implement print invoice functionality
    console.log('Printing invoice for order:', order.orderNumber);
  };

  const handleSendEmail = (order) => {
    // Implement send email functionality
    console.log('Sending email for order:', order.orderNumber);
  };

  const handleStatusUpdate = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusDialogOpen(true);
  };

  const handleStatusUpdateConfirm = () => {
    if (selectedOrder && newStatus) {
      // Here you would typically make an API call to update the order status
      console.log('Updating order status:', {
        orderId: selectedOrder._id,
        newStatus,
        timestamp: new Date().toISOString()
      });

      // Update the order in the local state
      const updatedOrders = orders.map(order => {
        if (order._id === selectedOrder._id) {
          return {
            ...order,
            status: newStatus,
            statusHistory: [
              ...(order.statusHistory || []),
              {
                status: newStatus,
                timestamp: new Date().toISOString(),
                updatedBy: 'Admin' // In a real app, this would be the current user
              }
            ]
          };
        }
        return order;
      });

      // Update the orders array
      orders.length = 0;
      orders.push(...updatedOrders);

      setStatusDialogOpen(false);
      setSelectedOrder(null);
      setNewStatus('');
    }
  };

  const handleStatusUpdateCancel = () => {
    setStatusDialogOpen(false);
    setSelectedOrder(null);
    setNewStatus('');
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    const matchesDate = (!dateRange.start || new Date(order.date) >= new Date(dateRange.start)) &&
                       (!dateRange.end || new Date(order.date) <= new Date(dateRange.end));
    const matchesTotal = (!totalRange.min || order.total >= parseFloat(totalRange.min)) &&
                        (!totalRange.max || order.total <= parseFloat(totalRange.max));
    return matchesSearch && matchesStatus && matchesDate && matchesTotal;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date_desc':
        return new Date(b.date) - new Date(a.date);
      case 'date_asc':
        return new Date(a.date) - new Date(b.date);
      case 'total_desc':
        return b.total - a.total;
      case 'total_asc':
        return a.total - b.total;
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'Processing':
        return 'info';
      case 'Shipped':
        return 'primary';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const OrderDetails = ({ order }) => (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customer Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CustomerIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={order.customer.name}
                    secondary={order.customer.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Phone"
                    secondary={order.customer.phone}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Shipping Address"
                    secondary={order.shippingAddress}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ReceiptIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Order Number"
                    secondary={order.orderNumber}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Date"
                    secondary={new Date(order.date).toLocaleDateString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Status"
                    secondary={
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    }
                  />
                </ListItem>
                {order.trackingNumber && (
                  <ListItem>
                    <ListItemText
                      primary="Tracking Number"
                      secondary={order.trackingNumber}
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Items
              </Typography>
              <List>
                {order.items.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar src={item.image} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.product}
                      secondary={`Quantity: ${item.quantity} × $${item.price.toFixed(2)}`}
                    />
                    <Typography variant="subtitle1">
                      ${(item.quantity * item.price).toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Total"
                    primaryTypographyProps={{ variant: 'h6' }}
                  />
                  <Typography variant="h6" color="primary">
                    ${order.total.toFixed(2)}
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        {order.notes && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notes
                </Typography>
                <Typography variant="body1">
                  {order.notes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );

  const ViewOrderDialog = ({ open, onClose, order }) => {
    if (!order) return null;

    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Order Details - {order.orderNumber}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <OrderDetails order={order} />
            </Grid>
            
            {/* Status History Section */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Status History
                  </Typography>
                  <List>
                    {(order.statusHistory || []).map((history, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemIcon>
                            {orderStatuses.find(s => s.value === history.status)?.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={history.status}
                            secondary={
                              <>
                                <Typography variant="body2" component="span">
                                  {new Date(history.timestamp).toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Updated by: {history.updatedBy}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                        {index < (order.statusHistory || []).length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button
            variant="contained"
            onClick={() => handleStatusUpdate(order)}
            startIcon={<UpdateIcon />}
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Status Update Dialog
  const StatusUpdateDialog = ({ 
    open, 
    onClose, 
    order, 
    newStatus,
    onNewStatusChange,
    onConfirm
  }) => {
    if (!order) return null;

    return (
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="sm" 
        fullWidth
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onConfirm();
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EditStatusIcon color="primary" />
            <Typography variant="h6">Update Order Status</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Order Information
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Order Number:
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {order.orderNumber}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Current Status:
              </Typography>
              <Chip
                label={order.status}
                color={getStatusColor(order.status)}
                size="small"
                icon={orderStatuses.find(s => s.value === order.status)?.icon}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              New Status
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Select Status</InputLabel>
              <Select
                value={newStatus}
                label="Select Status"
                onChange={(e) => onNewStatusChange(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300
                    }
                  }
                }}
              >
                {orderStatuses.map((status) => (
                  <MenuItem 
                    key={status.value} 
                    value={status.value}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      py: 1
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      color: `${status.color}.main`
                    }}>
                      {status.icon}
                      <Typography>{status.value}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {newStatus !== order.status && (
            <Alert 
              severity="info" 
              sx={{ mt: 2 }}
              icon={<EditStatusIcon />}
            >
              Status will be updated from <strong>{order.status}</strong> to <strong>{newStatus}</strong>
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, bgcolor: 'background.default' }}>
          <Button 
            onClick={onClose}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="primary"
            disabled={!newStatus || newStatus === order.status}
            startIcon={<EditStatusIcon />}
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        borderBottom: '1px solid',
        borderColor: 'divider',
        pb: 2
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Order Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track all customer orders
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={() => setShowFilters(!showFilters)}
            sx={{ minWidth: 120 }}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button
            variant="contained"
            startIcon={<ExportIcon />}
            onClick={handleExport}
            sx={{ minWidth: 120 }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Filters and Search */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 3, 
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search orders by number, customer, or email..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Filter by Status"
                onChange={handleStatusChange}
                sx={{ 
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider'
                  }
                }}
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort Orders</InputLabel>
              <Select
                value={sortBy}
                label="Sort Orders"
                onChange={handleSortChange}
                sx={{ 
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider'
                  }
                }}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {showFilters && (
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Date Range
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label="Start Date"
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                  <TextField
                    label="End Date"
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Amount Range
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label="Minimum Amount"
                    type="number"
                    value={totalRange.min}
                    onChange={(e) => setTotalRange(prev => ({ ...prev, min: e.target.value }))}
                    InputProps={{ 
                      startAdornment: <PaymentIcon color="action" />,
                      inputProps: { min: 0 }
                    }}
                    fullWidth
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                  <TextField
                    label="Maximum Amount"
                    type="number"
                    value={totalRange.max}
                    onChange={(e) => setTotalRange(prev => ({ ...prev, max: e.target.value }))}
                    InputProps={{ 
                      startAdornment: <PaymentIcon color="action" />,
                      inputProps: { min: 0 }
                    }}
                    fullWidth
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Orders Table */}
      <Paper 
        elevation={0}
        sx={{ 
          width: '100%', 
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2
        }}
      >
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Order Number</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Items</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow 
                    key={order._id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {order.orderNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {order.customer.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.customer.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(order.date).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CartIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        ${order.total.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                        icon={orderStatuses.find(s => s.value === order.status)?.icon}
                        sx={{ 
                          fontWeight: 500,
                          '& .MuiChip-icon': {
                            color: 'inherit'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog(order)}
                            sx={{ color: 'primary.main' }}
                          >
                            <ViewDetailsIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Update Status">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleStatusUpdate(order)}
                          >
                            <EditStatusIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="View History">
                          <IconButton 
                            size="small"
                            onClick={() => handleOpenDialog(order)}
                            sx={{ color: 'info.main' }}
                          >
                            <ViewHistoryIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        />
      </Paper>

      {/* Status Update Dialog */}
      <StatusUpdateDialog
        open={statusDialogOpen}
        onClose={handleStatusUpdateCancel}
        order={selectedOrder}
        newStatus={newStatus}
        onNewStatusChange={setNewStatus}
        onConfirm={handleStatusUpdateConfirm}
      />

      {/* Order Details Dialog */}
      <ViewOrderDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        order={selectedOrder}
      />
    </Box>
  );
}

export default Orders; 