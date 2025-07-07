// API Utility Functions

// Format API response data
export const formatAPIResponse = (response) => {
  if (!response || !response.data) {
    return null;
  }
  return response.data;
};

// Format error message from API response
export const formatErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Indian format)
export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Validate password strength
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    minLength: password.length >= minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSpecialChar,
  };
};

// Format price to Indian Rupees
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

// Format date to readable format
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format date and time
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Generate query string from object
export const generateQueryString = (params) => {
  const queryParams = new URLSearchParams();
  
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      if (Array.isArray(params[key])) {
        params[key].forEach(value => queryParams.append(key, value));
      } else {
        queryParams.append(key, params[key]);
      }
    }
  });
  
  return queryParams.toString();
};

// Parse query string to object
export const parseQueryString = (queryString) => {
  const params = new URLSearchParams(queryString);
  const result = {};
  
  for (const [key, value] of params.entries()) {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  }
  
  return result;
};

// Debounce function for API calls
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for API calls
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Retry function for failed API calls
export const retry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 2);
  }
};

// Handle file upload with progress
export const uploadFileWithProgress = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        onProgress(progress);
      }
    });
    
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error('Upload failed'));
      }
    });
    
    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });
    
    const formData = new FormData();
    formData.append('file', file);
    
    xhr.open('POST', '/api/upload');
    xhr.send(formData);
  });
};

// Validate form data before API call
export const validateFormData = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = rules[field];
    
    if (fieldRules.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`;
    } else if (value && fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
    } else if (value && fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[field] = `${field} must be at most ${fieldRules.maxLength} characters`;
    } else if (value && fieldRules.pattern && !fieldRules.pattern.test(value)) {
      errors[field] = fieldRules.message || `${field} format is invalid`;
    } else if (value && fieldRules.custom) {
      const customError = fieldRules.custom(value, data);
      if (customError) {
        errors[field] = customError;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Create API request config
export const createRequestConfig = (config = {}) => {
  const defaultConfig = {
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  return { ...defaultConfig, ...config };
};

// Handle API response with loading state
export const withLoadingState = async (apiCall, setLoading, setError) => {
  try {
    setLoading(true);
    setError(null);
    const result = await apiCall();
    return result;
  } catch (error) {
    setError(formatErrorMessage(error));
    throw error;
  } finally {
    setLoading(false);
  }
};

// Cache API responses
export const createAPICache = () => {
  const cache = new Map();
  
  return {
    get: (key) => cache.get(key),
    set: (key, value, ttl = 5 * 60 * 1000) => {
      cache.set(key, {
        value,
        timestamp: Date.now(),
        ttl,
      });
    },
    has: (key) => {
      const item = cache.get(key);
      if (!item) return false;
      
      const isExpired = Date.now() - item.timestamp > item.ttl;
      if (isExpired) {
        cache.delete(key);
        return false;
      }
      
      return true;
    },
    clear: () => cache.clear(),
    delete: (key) => cache.delete(key),
  };
};

// Generate unique request ID
export const generateRequestId = () => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Log API requests for debugging
export const logAPIRequest = (config) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers,
    });
  }
};

// Log API responses for debugging
export const logAPIResponse = (response) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
  }
}; 