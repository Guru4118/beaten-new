import React from 'react';
import {
  Box,
  useTheme
} from '@mui/material';

const AdminPageToolbar = ({
  children,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        mb: 3,
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

export default AdminPageToolbar; 