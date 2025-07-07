import React from 'react';
import {
  Badge,
  Box,
  useTheme
} from '@mui/material';

const AdminBadge = ({
  children,
  badgeContent,
  color = 'primary',
  variant = 'standard',
  showZero = false,
  max = 99,
  sx = {},
  ...props
}) => {
  const theme = useTheme();

  return (
    <Badge
      badgeContent={badgeContent}
      color={color}
      variant={variant}
      showZero={showZero}
      max={max}
      sx={{
        '& .MuiBadge-badge': {
          borderRadius: 1,
          ...sx
        }
      }}
      {...props}
    >
      {children}
    </Badge>
  );
};

export default AdminBadge; 