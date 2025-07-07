import React from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme
} from '@mui/material';
import {
  ErrorOutline as ErrorIcon
} from '@mui/icons-material';

const AdminErrorState = ({
  title = 'Error Occurred',
  description = 'Something went wrong. Please try again later.',
  icon = <ErrorIcon />,
  action,
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
        p: 4,
        textAlign: 'center',
        ...sx
      }}
    >
      <Box
        sx={{
          color: 'error.main',
          fontSize: '3rem',
          mb: 1
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="h6"
        sx={{
          color: 'text.primary',
          fontWeight: 600
        }}
      >
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            maxWidth: 400
          }}
        >
          {description}
        </Typography>
      )}

      {action && (
        <Button
          variant="contained"
          color="primary"
          onClick={action.onClick}
          startIcon={action.icon}
          sx={{
            mt: 2
          }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
};

export default AdminErrorState; 