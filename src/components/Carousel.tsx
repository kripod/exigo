import React, { useState } from 'react';
import CarouselContainer from './CarouselContainer';
import CarouselControls from './CarouselControls';
import CarouselRotator, { CarouselRotatorProps } from './CarouselRotator';

interface CarouselProps extends CarouselRotatorProps {
  initialIndex?: number;
}

export default function Carousel({
  initialIndex = 0,
  ...props
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return (
    <CarouselContainer>
      <CarouselControls />
      <CarouselRotator
        activeIndex={activeIndex}
        {...props} // `activeIndex` is overridable from here
      />
    </CarouselContainer>
  );
}
