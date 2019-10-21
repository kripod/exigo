import React from 'react';
import CarouselContainer from './CarouselContainer';
import CarouselControls from './CarouselControls';
import CarouselRotator, { CarouselRotatorProps } from './CarouselRotator';

export default function Carousel(props: CarouselRotatorProps) {
  return (
    <CarouselContainer>
      <CarouselControls />
      <CarouselRotator {...props} />
    </CarouselContainer>
  );
}
