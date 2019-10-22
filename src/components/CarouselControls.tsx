import React from 'react';
import CarouselNavigationIconButton from './CarouselNavigationIconButton';

// TODO: Consider renaming to `CarouselControlPanel`
export default function CarouselControls() {
  return (
    <div>
      {/* TODO: Add play/pause button */}
      <CarouselNavigationIconButton
        aria-label="Next slide"
        icon="chevron-right"
      />
      <CarouselNavigationIconButton
        aria-label="Previous slide"
        icon="chevron-left"
      />
    </div>
  );
}
