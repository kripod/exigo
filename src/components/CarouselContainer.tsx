import { Box, BoxProps } from '@chakra-ui/core';
import React, { useRef, useState } from 'react';
import CarouselContext from './CarouselContext';

export interface CarouselContainerProps extends BoxProps {
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
      value={[infinite, useState(autoPlay), useState(initialIndex), useRef([])]}
    >
      <Box
        as="section"
        aria-roledescription="carousel"
        position="relative"
        {...restProps}
      />
    </CarouselContext.Provider>
  );
}
