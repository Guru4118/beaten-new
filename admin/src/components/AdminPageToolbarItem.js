import React from 'react';
import {
  Box,
  useTheme
} from '@mui/material';

const AdminPageToolbarItem = ({
  children,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

export default AdminPageToolbarItem; 