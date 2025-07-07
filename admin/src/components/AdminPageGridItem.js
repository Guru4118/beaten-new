import React from 'react';
import {
  Grid,
  useTheme
} from '@mui/material';

const AdminPageGridItem = ({
  children,
  xs = 12,
  sm,
  md,
  lg,
  xl,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Grid
      item
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      sx={{
        ...sx
      }}
    >
      {children}
    </Grid>
  );
};

export default AdminPageGridItem; 