import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300); // Show button after scrolling 300px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    isVisible && (
      <Tooltip title="Scroll to Top">
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            backgroundColor: '#fff',
            color: '#333',
            '&:hover': {
              backgroundColor: '#555',
            },
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <ArrowUpward />
        </IconButton>
      </Tooltip>
    )
  );
};

export default ScrollToTopButton;
