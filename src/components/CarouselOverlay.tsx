import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';
import CarouselStepIconButton from './CarouselStepIconButton';

export default function CarouselOverlay(props: BoxProps) {
  return (
    <Box css={{ '& > *': { position: 'absolute', zIndex: 1 } }} {...props}>
      {/* TODO: Add play/pause button */}
      <CarouselStepIconButton
        aria-label="Next slide"
        icon="chevron-right"
        top="50%"
        right={4}
        transform="translateY(-50%)"
      />
      <CarouselStepIconButton
        aria-label="Previous slide"
        icon="chevron-left"
        top="50%"
        left={4}
        transform="translateY(-50%)"
      />
    </Box>
  );
}
