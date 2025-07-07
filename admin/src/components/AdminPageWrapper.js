import React from 'react';
import {
  Box,
  useTheme
} from '@mui/material';

const AdminPageWrapper = ({
  children,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        py: 3,
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

export default AdminPageWrapper; 