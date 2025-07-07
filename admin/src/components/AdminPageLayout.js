import React from 'react';
import {
  Box,
  useTheme
} from '@mui/material';

const AdminPageLayout = ({
  children,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

export default AdminPageLayout; 