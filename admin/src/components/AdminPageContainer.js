import React from 'react';
import {
  Box,
  Container,
  useTheme
} from '@mui/material';

const AdminPageContainer = ({
  children,
  maxWidth = 'lg',
  disableGutters = false,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        py: 3,
        ...sx
      }}
    >
      <Container
        maxWidth={maxWidth}
        disableGutters={disableGutters}
        sx={{
          px: disableGutters ? 0 : 3
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default AdminPageContainer; 