import React from 'react';
import {
  Box,
  Typography,
  Link,
  useTheme
} from '@mui/material';

const AdminPageFooter = ({
  copyright = '© 2024 Your Company. All rights reserved.',
  links = [],
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
        ...sx
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap'
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary'
          }}
        >
          {copyright}
        </Typography>

        {links.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={link.onClick}
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminPageFooter; 