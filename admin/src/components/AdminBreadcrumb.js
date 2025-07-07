import React from 'react';
import {
  Breadcrumbs,
  Link,
  Typography,
  useTheme
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';

const AdminBreadcrumb = ({
  items = [],
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        '& .MuiBreadcrumbs-separator': {
          mx: 1
        },
        ...sx
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast) {
          return (
            <Typography
              key={index}
              color="text.primary"
              sx={{
                fontWeight: 500
              }}
            >
              {item.label}
            </Typography>
          );
        }

        return (
          <Link
            key={index}
            color="inherit"
            href={item.href}
            onClick={item.onClick}
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default AdminBreadcrumb; 