import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import {
  People as PeopleIcon,
  ShoppingCart as OrdersIcon,
  Inventory as ProductsIcon,
  AttachMoney as RevenueIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Circle as CircleIcon
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// Static data
const stats = {
  totalCustomers: 156,
  totalOrders: 243,
  totalProducts: 89,
  totalRevenue: 45678.90,
  growth: {
    customers: 12.5,
    orders: 8.3,
    revenue: 15.7
  }
};

const recentActivities = [
  {
    id: 1,
    type: 'order',
    message: 'New order #ORD-001 from John Doe',
    time: '5 minutes ago',
    amount: 299.97
  },
  {
    id: 2,
    type: 'customer',
    message: 'New customer registration: Jane Smith',
    time: '1 hour ago'
  },
  {
    id: 3,
    type: 'product',
    message: 'Product "Classic White Sneakers" stock updated',
    time: '2 hours ago',
    stock: 45
  },
  {
    id: 4,
    type: 'order',
    message: 'Order #ORD-002 marked as delivered',
    time: '3 hours ago',
    amount: 149.99
  }
];

const topProducts = [
  {
    id: 1,
    name: 'Classic White Sneakers',
    sales: 45,
    revenue: 4049.55,
    target: 50
  },
  {
    id: 2,
    name: 'Black Leather Boots',
    sales: 38,
    revenue: 5699.62,
    target: 40
  },
  {
    id: 3,
    name: 'Running Shoes',
    sales: 32,
    revenue: 3839.68,
    target: 35
  }
];

// Chart data
const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
  { name: 'Jul', sales: 3490, revenue: 4300 }
];

const categoryData = [
  { name: 'Sneakers', value: 35 },
  { name: 'Boots', value: 25 },
  { name: 'Sports', value: 20 },
  { name: 'Casual', value: 15 },
  { name: 'Formal', value: 5 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const revenueData = [
  { name: 'Online', value: 65 },
  { name: 'Store', value: 35 }
];

function Dashboard() {
  const StatCard = ({ title, value, icon, color, growth }) => (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        height: 140,
        bgcolor: color,
        color: 'white'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        {icon}
      </Box>
      <Typography variant="h4" component="div" sx={{ mt: 2 }}>
        {value}
      </Typography>
      {growth && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          {growth > 0 ? (
            <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 16, mr: 0.5 }} />
          )}
          <Typography variant="body2">
            {Math.abs(growth)}% from last month
          </Typography>
        </Box>
      )}
    </Paper>
  );

  const ActivityItem = ({ activity }) => (
    <ListItem>
      <ListItemIcon>
        <CircleIcon sx={{ 
          fontSize: 8,
          color: activity.type === 'order' ? '#2e7d32' :
                 activity.type === 'customer' ? '#1976d2' :
                 activity.type === 'product' ? '#ed6c02' : '#9c27b0'
        }} />
      </ListItemIcon>
      <ListItemText
        primary={activity.message}
        secondary={activity.time}
      />
      {activity.amount && (
        <Typography variant="body2" color="text.secondary">
          ${activity.amount.toFixed(2)}
        </Typography>
      )}
    </ListItem>
  );

  const ProductProgress = ({ product }) => (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.sales}/{product.target} units
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={(product.sales / product.target) * 100}
        sx={{ height: 8, borderRadius: 4 }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        ${product.revenue.toFixed(2)} revenue
      </Typography>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={<PeopleIcon />}
            color="#1976d2"
            growth={stats.growth.customers}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<OrdersIcon />}
            color="#2e7d32"
            growth={stats.growth.orders}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<ProductsIcon />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toFixed(2)}`}
            icon={<RevenueIcon />}
            color="#9c27b0"
            growth={stats.growth.revenue}
          />
        </Grid>

        {/* Sales Trend Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Sales Trend
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="2"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Category Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Category Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Revenue Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300, overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ActivityItem activity={activity} />
                  {index < recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top Products
            </Typography>
            {topProducts.map((product) => (
              <ProductProgress key={product.id} product={product} />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 