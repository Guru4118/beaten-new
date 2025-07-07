import React from 'react';
import {
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';

const AdminPageToolbarButton = ({
  icon,
  tooltip,
  onClick,
  disabled = false,
  color = 'default',
  size = 'medium',
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Tooltip title={tooltip}>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        color={color}
        size={size}
        sx={{
          ...sx
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default AdminPageToolbarButton; 