import React from 'react';
import { Box, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';

// Placeholder news data
const newsItems = [
  " GRAND OPENING OFFER: JOIN BEATEN PREMIUM FOR SURPRISE DROPS, AND SECRET SALES. ",
//   "✨ New collection drop: Discover the latest arrivals in streetwear!",
//   "📦 Free shipping on all orders over $100! Shop now!",
//   "📣 Follow us on social media for exclusive updates and giveaways!",
];

const NewsScroller = () => {
  return (
    <Box
      sx={{
        // background: 'linear-gradient(230deg, rgba(199, 145, 18, 1) 0%, rgba(60, 82, 70, 1) 70%)',
        background: '#E8E8E8',
    color: '#fff',
    p: 4,
    // borderRadius: 2, // Example background color (red)
        color: 'black', //black Text color
        py: 0.8, // Vertical padding
        overflow: 'hidden', // Hide overflow to ensure horizontal scroll
        whiteSpace: 'nowrap', // Prevent text wrapping
        width: '100%', // Take full width
        boxSizing: 'border-box', // Include padding in width
        // fontStyle: 'italic',
      }}
    >
      <Marquee gradient={false} speed={40} play={true} pauseOnHover={false} direction="left">
        {newsItems.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              mx: 2, // Horizontal spacing between items
              display: 'inline-block', // Ensure items are inline
              fontWeight: 400,
              letterSpacing: '0.05em',
            //   fontStyle: 'italic',
              letterSpacing: '0.2em',
              fontFamily: [
                'Roboto',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Arial',
                'sans-serif',
              ].join(','),
              fontSize: { xs: '0.875rem', md: '0.8rem' }
            }}
          >
            {item}
          </Typography>
        ))}
      </Marquee>
    </Box>
  );
};

export default NewsScroller; 