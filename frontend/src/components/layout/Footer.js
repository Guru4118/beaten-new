import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

// Custom Link component that scrolls to top on click
const ScrollToTopLink = ({ to, children, ...props }) => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <RouterLink to={to} onClick={handleClick} {...props}>
      {children}
    </RouterLink>
  );
};

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const footerSections = [
    {
      title: 'SHOP',
      links: [
        { text: 'Home', to: '/' },
        { text: 'Products', to: '/products' },
        { text: 'Orders', to: '/orders' },
        { text: 'Collections', to: '/collections' },
        { text: 'Premium Membership', to: '/premium' }
      ]
    },
    {
      title: 'COMPANY',
      links: [
        { text: 'About Us', to: '/about' },
         { text: 'Contact', to: '/contact' },
        { text: 'Privacy Policy', to: '/privacy' },
        { text: 'Terms of Service', to: '/terms' },
        // { text: 'Press', to: '/press' }
      ]
    },
    {
      title: 'SUPPORT',
      links: [
        { text: 'Help Center', to: '/help' },
        { text: 'Shipping', to: '/shipping' },
        { text: 'Returns', to: '/returns' },
        { text: 'Size Guide', to: '/size-guide' },
        { text: 'Track Your Order', to: '/track-order' }
      ]
    }
  ];

  const renderMobileSection = (section) => (
    <Accordion
      key={section.title}
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        '&:before': {
          display: 'none',
        },
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        '&:last-child': {
          borderBottom: 'none',
        }
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
        sx={{
          padding: 0,
          '& .MuiAccordionSummary-content': {
            margin: '12px 0',
          }
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            opacity: 0.9,
            color: 'white'
          }}
        >
          {section.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '0 0 16px 0' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {section.links.map((link) => (
            <ScrollToTopLink
              key={link.text}
              to={link.to}
              style={{
                color: 'white',
                textDecoration: 'none',
                opacity: 0.7,
                fontSize: '0.9rem',
                letterSpacing: '0.02em',
                transition: 'all 0.3s ease',
                '&:hover': {
                  opacity: 1,
                  transform: 'translateX(4px)'
                }
              }}
            >
              {link.text}
            </ScrollToTopLink>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );

  const renderDesktopSection = (section, index) => (
    <Grid item xs={12} sm={6} md={2.33} key={section.title}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 600,
          fontSize: '0.9rem',
          letterSpacing: '0.1em',
          opacity: 0.9
        }}
      >
        {section.title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {section.links.map((link) => (
          <ScrollToTopLink
            key={link.text}
            to={link.to}
            style={{
              color: 'white',
              textDecoration: 'none',
              opacity: 0.7,
              fontSize: '0.9rem',
              letterSpacing: '0.02em',
              transition: 'all 0.3s ease',
              '&:hover': {
                opacity: 1,
                transform: 'translateX(4px)'
              }
            }}
          >
            {link.text}
          </ScrollToTopLink>
        ))}
      </Box>
    </Grid>
  );

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#000000',
        color: 'white',
        pt: { xs: 2, md: 8 },
        pb: { xs: 4, md: 6 },
        position: 'relative',
        mb: { xs: '60px', md: 0 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
        }
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 3 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={5}>
            <Typography
              variant="h4"
              component={ScrollToTopLink}
              to="/"
              sx={{
                fontWeight: 800,
                mb: 3,
                display: 'block',
                textDecoration: 'none',
                color: 'white',
                letterSpacing: '0.15em',
                // fontSize: { xs: '1.75rem', md: '2rem' }
              }}
            >
              <img 
                src="/Beaten/logo.png" 
                alt="Beaten Logo" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  padding: 0, 
                  margin: 0,
                  maxWidth: '200px',
                  display: 'block'
                }} 
              />
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                opacity: 0.7,
                maxWidth: '400px',
                lineHeight: 1.8,
                fontSize: '1rem',
                letterSpacing: '0.02em'
              }}
            >
              Premium streetwear that defines the future of fashion. Crafted with
              precision, designed for impact.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[
                { icon: <FacebookIcon />, href: 'https://facebook.com/beatenofficial', label: 'Facebook' },
                { icon: <TwitterIcon />, href: ' https://twitter.com/Beatenofficial', label: 'Twitter' },
                { icon: <InstagramIcon />, href: 'https://instagram.com/beaten.in', label: 'Instagram' },
                { icon: <YouTubeIcon />, href: 'https://www.youtube.com/@Beatenbros', label: 'YouTube' }
              ].map((social) => (
                <IconButton
                  key={social.label}
                  color="inherit"
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease',
                    width: 40,
                    height: 40
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          {isMobile ? (
            <Grid item xs={12}>
              {footerSections.map((section, index) => renderMobileSection(section))}
            </Grid>
          ) : (
            footerSections.map((section, index) => renderDesktopSection(section, index))
          )}
        </Grid>

        <Divider sx={{
          my: 2,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          opacity: 0.1
        }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: 3
          }}
        >
          <Typography
            variant="body2"
            sx={{
              opacity: 0.5,
              fontSize: '0.85rem',
              letterSpacing: '0.02em'
            }}
          >
            © {new Date().getFullYear()} BEATEN. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 4,
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <ScrollToTopLink
              to="/privacy"
              style={{
                color: 'white',
                textDecoration: 'none',
                opacity: 0.5,
                fontSize: '0.85rem',
                letterSpacing: '0.02em',
                transition: 'all 0.3s ease',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              Privacy Policy
            </ScrollToTopLink>
            <ScrollToTopLink
              to="/terms"
              style={{
                color: 'white',
                textDecoration: 'none',
                opacity: 0.5,
                fontSize: '0.85rem',
                letterSpacing: '0.02em',
                transition: 'all 0.3s ease',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              Terms of Service
            </ScrollToTopLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 