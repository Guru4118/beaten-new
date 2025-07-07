import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
  Paper,
  Box,
  Avatar
} from '@mui/material';
import {
  ShoppingBag as ShoppingBagIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  Explore as ExploreIcon,
  ExploreOutlined as ExploreOutlinedIcon,
  ShoppingBagOutlined as ShoppingBagOutlinedIcon,
  FavoriteBorder as FavoriteBorderIcon,
  PersonOutline as PersonOutlineIcon
} from '@mui/icons-material';

const bottomNavItems = [
  { name: 'Explore', path: '/collections', icon: <ExploreOutlinedIcon />, activeIcon: <ExploreIcon /> },
  { name: 'Products', path: '/products', icon: <ShoppingBagOutlinedIcon />, activeIcon: <ShoppingBagIcon /> },
  { 
    name: '', 
    path: '/', 
    icon: (
      <Box 
        component="img" 
        src="/Beaten/Artboard 3 copy.png" 
        alt="Beaten Logo" 
        className="bottom-nav-home-img"
        sx={{
          width: 50,
          height: 50,
          objectFit: 'contain',
          display: 'block',
          mx: 'auto',
        }}
      />
    ) 
  },
  { name: 'Wishlist', path: '/wishlist', icon: <FavoriteBorderIcon />, activeIcon: <FavoriteIcon /> },
  { name: 'Account', path: '/profile', icon: <PersonOutlineIcon />, activeIcon: <PersonIcon /> }
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!isMobile) return null;

  const currentPath = location.pathname;

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderRadius: 0,
        pb: 'env(safe-area-inset-bottom)'
      }}
    >
      <BottomNavigation
        showLabels={false}
        value={currentPath}
        onChange={(event, newValue) => {
          if (newValue !== location.pathname) {
             navigate(newValue);
             window.scrollTo(0, 0);
          }
        }}
        sx={{
          backgroundColor: 'transparent',
          height: 60,
          '& .MuiBottomNavigationAction-root': {
            color: '#9e9e9e',
            transition: 'all 0.3s ease',
            padding: '6px 0 8px',
            minWidth: 'auto',
            '& .MuiBottomNavigationAction-icon': {
              marginBottom: 0
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              transition: 'all 0.2s ease',
              display: 'none',
            },
            '&.Mui-selected': {
              color: '#FFFFFF',
              // paddingTop: '8px',
              '& .MuiBottomNavigationAction-label': {
                display: 'block',
                fontWeight: 600,
                fontSize: '0.8rem',
                marginBottom: '0px'
              },
              '& .MuiBottomNavigationAction-icon': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s ease'
              },
              '& .bottom-nav-home-img': {
                marginBottom: '2px',
                transition: 'margin-bottom 0.2s',
              }
            },
          }
        }}
      >
        {bottomNavItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={item.name}
            value={item.path}
            icon={currentPath === item.path && item.activeIcon ? item.activeIcon : item.icon}
            component={RouterLink}
            to={item.path}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 28
              }
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav; 