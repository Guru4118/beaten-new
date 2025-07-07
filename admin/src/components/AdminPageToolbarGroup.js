import React from 'react';
import {
  Box,
  useTheme
} from '@mui/material';

const AdminPageToolbarGroup = ({
  children,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

export default AdminPageToolbarGroup; 