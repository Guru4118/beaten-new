import React from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const LoadingContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#000000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
}));

const AnimatedLogo = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 800,
  letterSpacing: '0.2em',
  color: 'white',
  position: 'relative',
  animation: `${fadeIn} 1s ease-out`,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    backgroundSize: '1000px 100%',
    animation: `${shimmer} 2s infinite linear`,
  },
}));

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <AnimatedLogo variant="h1">
        BEATEN
      </AnimatedLogo>
    </LoadingContainer>
  );
};

export default LoadingScreen; 
import { Box, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const LoadingContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#000000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
}));

const AnimatedLogo = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 800,
  letterSpacing: '0.2em',
  color: 'white',
  position: 'relative',
  animation: `${fadeIn} 1s ease-out`,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    backgroundSize: '1000px 100%',
    animation: `${shimmer} 2s infinite linear`,
  },
}));

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <AnimatedLogo variant="h1">
        BEATEN
      </AnimatedLogo>
    </LoadingContainer>
  );
};

export default LoadingScreen; 
import { Box, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const LoadingContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#000000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
}));

const AnimatedLogo = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 800,
  letterSpacing: '0.2em',
  color: 'white',
  position: 'relative',
  animation: `${fadeIn} 1s ease-out`,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    backgroundSize: '1000px 100%',
    animation: `${shimmer} 2s infinite linear`,
  },
}));

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <AnimatedLogo variant="h1">
        BEATEN
      </AnimatedLogo>
    </LoadingContainer>
  );
};

export default LoadingScreen; 