import React from 'react';
import {
  Box,
  useTheme
} from '@mui/material';

const AdminPageContent = ({
  children,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: 3,
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

export default AdminPageContent; 