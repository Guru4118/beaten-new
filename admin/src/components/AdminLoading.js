import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  useTheme
} from '@mui/material';

const AdminLoading = ({
  message = 'Loading...',
  size = 40,
  thickness = 3.6,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 3,
        ...sx
      }}
    >
      <CircularProgress
        size={size}
        thickness={thickness}
        sx={{
          color: 'primary.main'
        }}
      />
      {message && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontWeight: 500
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default AdminLoading; 