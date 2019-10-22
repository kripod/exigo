import React from 'react';
import CarouselContainer, { CarouselContainerProps } from './CarouselContainer';
import CarouselControls from './CarouselControls';
import CarouselRotator, { CarouselRotatorProps } from './CarouselRotator';

export interface CarouselProps
  extends CarouselRotatorProps,
    Omit<CarouselContainerProps, 'children'> {}

export default function Carousel({
  children,
  playInterval,
  activeIndex,
  spacing,
  spacingX,
  spacingY,
  ...restProps
}: CarouselProps) {
  return (
    <CarouselContainer {...restProps}>
      <CarouselControls />
      <CarouselRotator
        playInterval={playInterval}
        activeIndex={activeIndex}
        spacing={spacing}
        spacingX={spacingX}
        spacingY={spacingY}
      >
        {children}
      </CarouselRotator>
    </CarouselContainer>
  );
}
