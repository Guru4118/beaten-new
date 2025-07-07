import React from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';

const AdminMenu = ({
  anchorEl,
  open,
  onClose,
  items = [],
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        elevation: 2,
        sx: {
          borderRadius: 1,
          minWidth: 180,
          ...sx
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {items.map((item, index) => {
        if (item.type === 'divider') {
          return <Divider key={index} />;
        }

        return (
          <MenuItem
            key={index}
            onClick={item.onClick}
            disabled={item.disabled}
            sx={{
              py: 1,
              px: 2,
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            {item.icon && (
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: 500
              }}
            />
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default AdminMenu; 