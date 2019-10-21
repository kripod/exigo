import { Box, BoxProps } from '@chakra-ui/core';
import React, { useState } from 'react';
import CarouselContext from './CarouselContext';

interface CarouselContainerProps extends BoxProps {
  infinite?: boolean;
  autoPlay?: boolean;
  initialIndex?: number;
}

export default function CarouselContainer({
  infinite = false,
  autoPlay = false,
  initialIndex = 0,
  ...restProps
}: CarouselContainerProps) {
  return (
    <CarouselContext.Provider
      value={[
        infinite,
        useState(autoPlay),
        useState(initialIndex),
        useState(initialIndex + 1),
      ]}
    >
      <Box as="section" aria-roledescription="carousel" {...restProps} />
    </CarouselContext.Provider>
  );
}
