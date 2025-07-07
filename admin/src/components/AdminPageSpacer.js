import React from 'react';
import {
  Box,
  useTheme
} from '@mui/material';

const AdminPageSpacer = ({
  size = 3,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: theme.spacing(size),
        ...sx
      }}
    />
  );
};

export default AdminPageSpacer; 