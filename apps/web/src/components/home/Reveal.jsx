import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

/**
 * Progressive reveal wrapper for home sections.
 * Uses IntersectionObserver to animate blocks when they enter the viewport.
 */
export function Reveal({ children, delay = 0, direction = 'up', distance = 28, sx = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const axis = direction === 'left' || direction === 'right' ? 'X' : 'Y';
  const sign = direction === 'left' || direction === 'up' ? 1 : -1;
  const translate = visible ? 'translate(0, 0)' : `translate${axis}(${sign * distance}px)`;

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: translate,
        transitionProperty: 'opacity, transform',
        transitionDuration: '680ms',
        transitionTimingFunction: 'cubic-bezier(0.2, 0.65, 0.2, 1)',
        transitionDelay: `${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
