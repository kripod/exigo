import { Box, BoxProps } from '@chakra-ui/core';
import React, { useRef, useState } from 'react';
import CarouselContext from './CarouselContext';

export interface CarouselContainerProps extends BoxProps {
  isInfinite?: boolean;
  autoPlay?: boolean;
  initialIndex?: number;
}

export default function CarouselContainer({
  isInfinite = false,
  autoPlay = false,
  initialIndex = 0,
  ...restProps
}: CarouselContainerProps) {
  return (
    <CarouselContext.Provider
      value={[
        isInfinite,
        useState(autoPlay),
        useState(initialIndex),
        useRef([]),
      ]}
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
