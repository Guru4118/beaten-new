import React from 'react';
import {
  Button,
  CircularProgress,
  useTheme
} from '@mui/material';

const AdminButton = ({
  children,
  loading = false,
  startIcon,
  endIcon,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  sx = {},
  ...props
}) => {
  const theme = useTheme();

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
      endIcon={endIcon}
      sx={{
        borderRadius: 1,
        textTransform: 'none',
        fontWeight: 500,
        ...sx
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AdminButton; 