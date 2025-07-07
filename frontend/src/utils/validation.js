import * as Yup from 'yup';

// Login validation schema
export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

// Register validation schema
export const registerSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .max(50, 'Name cannot be more than 50 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

// Profile validation schema
export const profileSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .max(50, 'Name cannot be more than 50 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
});

// Change password validation schema
export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required')
});

// Review validation schema
export const reviewSchema = Yup.object({
  rating: Yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot be more than 5')
    .required('Rating is required'),
  title: Yup.string()
    .required('Title is required')
    .max(100, 'Title cannot be more than 100 characters'),
  comment: Yup.string()
    .required('Comment is required')
    .max(500, 'Comment cannot be more than 500 characters')
}); 