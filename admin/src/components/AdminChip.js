import React from 'react';
import {
  Chip,
  useTheme
} from '@mui/material';

const AdminChip = ({
  label,
  color = 'default',
  variant = 'filled',
  size = 'medium',
  icon,
  avatar,
  onDelete,
  onClick,
  sx = {},
  ...props
}) => {
  const theme = useTheme();

  return (
    <Chip
      label={label}
      color={color}
      variant={variant}
      size={size}
      icon={icon}
      avatar={avatar}
      onDelete={onDelete}
      onClick={onClick}
      sx={{
        borderRadius: 1,
        fontWeight: 500,
        '& .MuiChip-deleteIcon': {
          fontSize: '1.1rem',
          margin: '0 4px 0 -6px'
        },
        ...sx
      }}
      {...props}
    />
  );
};

export default AdminChip; 