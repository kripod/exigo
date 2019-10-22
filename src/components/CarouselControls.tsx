import { Box } from '@chakra-ui/core';
import React from 'react';
import CarouselStepIconButton from './CarouselStepIconButton';

// TODO: Consider renaming to `CarouselControlPanel`
export default function CarouselControls() {
  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      zIndex={1}
      css={{ '& > *': { position: 'absolute' } }}
    >
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
