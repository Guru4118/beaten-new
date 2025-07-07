import React from 'react';
import {
  Box,
  useTheme
} from '@mui/material';

const AdminPageToolbarSpacer = ({
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        ...sx
      }}
    />
  );
};

export default AdminPageToolbarSpacer; 