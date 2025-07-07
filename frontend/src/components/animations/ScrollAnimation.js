import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const ScrollAnimation = ({ 
  children, 
  animation = 'fadeInUp',
  delay = 0,
  duration = 1000,
  threshold = 0.1,
  ...props 
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.visibility = 'visible';
            entry.target.style.animation = `${animation} ${duration}ms ease-out ${delay}ms forwards`;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px'
      }
    );

    if (elementRef.current) {
      elementRef.current.style.visibility = 'hidden';
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [animation, delay, duration, threshold]);

  return (
    <Box
      ref={elementRef}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ScrollAnimation; 