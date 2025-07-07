// Format price to currency
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

// Format date to readable string
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

// Format order status
export const formatOrderStatus = (status) => {
  const statusMap = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  };
  return statusMap[status] || status;
};

// Format product category
export const formatCategory = (category) => {
  const categoryMap = {
    men: "Men's",
    women: "Women's",
    accessories: 'Accessories'
  };
  return categoryMap[category] || category;
};

// Format product fit
export const formatFit = (fit) => {
  const fitMap = {
    regular: 'Regular',
    slim: 'Slim',
    oversized: 'Oversized'
  };
  return fitMap[fit] || fit;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}; 