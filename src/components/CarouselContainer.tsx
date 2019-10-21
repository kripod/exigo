import { Box, BoxProps } from '@chakra-ui/core';
import React, { useState } from 'react';
import CarouselContext from './CarouselContext';

interface CarouselContainerProps extends BoxProps {
  initialIndex?: number;
}

export default function CarouselContainer({
  initialIndex = 0,
  ...restProps
}: CarouselContainerProps) {
  return (
    <CarouselContext.Provider value={useState(initialIndex)}>
      <Box as="section" aria-roledescription="carousel" {...restProps} />
    </CarouselContext.Provider>
  );
}
