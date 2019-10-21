import React from 'react';
import CarouselContainer from './CarouselContainer';
import CarouselControls from './CarouselControls';
import CarouselRotator, { CarouselRotatorProps } from './CarouselRotator';

interface CarouselProps extends CarouselRotatorProps {
  initialIndex?: number;
}

export default function Carousel({
  initialIndex,
  ...restProps
}: CarouselProps) {
  return (
    <CarouselContainer initialIndex={initialIndex}>
      <CarouselControls />
      <CarouselRotator {...restProps} />
    </CarouselContainer>
  );
}
