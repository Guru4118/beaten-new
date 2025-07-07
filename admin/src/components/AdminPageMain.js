import React from 'react';
import {
  Box,
  useTheme
} from '@mui/material';

const AdminPageMain = ({
  children,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { md: `calc(100% - ${theme.drawerWidth}px)` },
        ml: { md: `${theme.drawerWidth}px` },
        mt: '64px',
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

export default AdminPageMain; 