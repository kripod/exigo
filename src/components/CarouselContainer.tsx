import { Box, BoxProps } from '@chakra-ui/core';
import React, { useState } from 'react';
import CarouselContext from './CarouselContext';

interface CarouselContainerProps extends BoxProps {
  autoPlay?: boolean;
  initialIndex?: number;
}

export default function CarouselContainer({
  autoPlay = false,
  initialIndex = 0,
  ...restProps
}: CarouselContainerProps) {
  return (
    <CarouselContext.Provider
      value={[useState(autoPlay), useState(initialIndex)]}
    >
      <Box as="section" aria-roledescription="carousel" {...restProps} />
    </CarouselContext.Provider>
  );
}
