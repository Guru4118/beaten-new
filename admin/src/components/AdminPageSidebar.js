import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';

const AdminPageSidebar = ({
  open,
  onClose,
  items = [],
  width = 280,
  sx = {}
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Admin Panel
        </Typography>
      </Box>

      <List
        sx={{
          flex: 1,
          p: 2
        }}
      >
        {items.map((item, index) => {
          if (item.type === 'divider') {
            return <Divider key={index} sx={{ my: 2 }} />;
          }

          return (
            <ListItem
              key={index}
              disablePadding
              sx={{
                mb: 0.5
              }}
            >
              <ListItemButton
                onClick={item.onClick}
                selected={item.selected}
                sx={{
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'inherit'
                    }
                  }
                }}
              >
                {item.icon && (
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: item.selected ? 'inherit' : 'text.secondary'
                    }}
                  >
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
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: width },
        flexShrink: { md: 0 }
      }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width,
              boxSizing: 'border-box',
              ...sx
            }
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              width,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider',
              ...sx
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default AdminPageSidebar; 