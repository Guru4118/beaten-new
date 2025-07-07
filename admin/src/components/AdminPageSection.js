import React from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme
} from '@mui/material';

const AdminPageSection = ({
  title,
  subtitle,
  children,
  action,
  elevation = 1,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={elevation}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        ...sx
      }}
    >
      {(title || subtitle || action) && (
        <Box
          sx={{
            p: 3,
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2
          }}
        >
          <Box>
            {title && (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 0.5
                }}
              >
                {title}
              </Typography>
            )}

            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary'
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          {action && (
            <Box>
              {action}
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ p: 3 }}>
        {children}
      </Box>
    </Paper>
  );
};

export default AdminPageSection; 