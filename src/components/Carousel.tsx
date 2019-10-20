import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';

// TODO: https://www.w3.org/TR/wai-aria-practices-1.1/#grouped-carousel-elements

interface CarouselProps extends BoxProps {
  role?: 'region' | 'group';
}

export default function Carousel({
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  role = ariaLabel || ariaLabelledby ? 'region' : 'group',
  ...restProps
}: CarouselProps) {
  return (
    <Box
      role={role}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-live="polite" // The carousel is NOT automatically rotating
      {...restProps}
    >
      {children}
    </Box>
  );
}
