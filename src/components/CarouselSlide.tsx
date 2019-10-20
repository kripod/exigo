import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';

export default function CarouselSlide({ children, ...restProps }: BoxProps) {
  return (
    <Box
      role="group"
      aria-roledescription="slide"
      flex="0 0 100%"
      css={{ scrollSnapAlign: 'center' }}
      {...restProps}
    >
      {children}
    </Box>
  );
}
