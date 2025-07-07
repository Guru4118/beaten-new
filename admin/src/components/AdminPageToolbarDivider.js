import React from 'react';
import {
  Divider,
  useTheme
} from '@mui/material';

const AdminPageToolbarDivider = ({
  orientation = 'vertical',
  flexItem = true,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Divider
      orientation={orientation}
      flexItem={flexItem}
      sx={{
        mx: 1,
        ...sx
      }}
    />
  );
};

export default AdminPageToolbarDivider; 