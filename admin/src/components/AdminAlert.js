import React from 'react';
import {
  Alert,
  AlertTitle,
  IconButton,
  Collapse,
  Box,
  useTheme
} from '@mui/material';
import {
  Close as CloseIcon
} from '@mui/icons-material';

const AdminAlert = ({
  severity = 'info',
  title,
  children,
  action,
  onClose,
  sx = {},
  ...props
}) => {
  const theme = useTheme();

  return (
    <Alert
      severity={severity}
      action={
        onClose && (
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ) || action
      }
      sx={{
        borderRadius: 1,
        '& .MuiAlert-icon': {
          alignItems: 'center'
        },
        '& .MuiAlert-message': {
          width: '100%'
        },
        ...sx
      }}
      {...props}
    >
      {title && (
        <AlertTitle sx={{ fontWeight: 600 }}>
          {title}
        </AlertTitle>
      )}
      {children}
    </Alert>
  );
};

export default AdminAlert; 