import React from 'react';
import CarouselStepIconButton from './CarouselStepIconButton';

// TODO: Consider renaming to `CarouselControlPanel`
export default function CarouselControls() {
  return (
    <div>
      {/* TODO: Add play/pause button */}
      <CarouselStepIconButton aria-label="Next slide" icon="chevron-right" />
      <CarouselStepIconButton aria-label="Previous slide" icon="chevron-left" />
    </div>
  );
}
