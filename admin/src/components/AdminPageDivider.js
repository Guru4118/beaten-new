import React from 'react';
import {
  Divider,
  Typography,
  Box,
  useTheme
} from '@mui/material';

const AdminPageDivider = ({
  text,
  orientation = 'horizontal',
  flexItem = false,
  sx = {}
}) => {
  const theme = useTheme();

  if (text) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          my: 3,
          ...sx
        }}
      >
        <Divider
          orientation={orientation}
          flexItem={flexItem}
          sx={{
            flex: 1
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            whiteSpace: 'nowrap'
          }}
        >
          {text}
        </Typography>
        <Divider
          orientation={orientation}
          flexItem={flexItem}
          sx={{
            flex: 1
          }}
        />
      </Box>
    );
  }

  return (
    <Divider
      orientation={orientation}
      flexItem={flexItem}
      sx={{
        my: 3,
        ...sx
      }}
    />
  );
};

export default AdminPageDivider; 