import React from 'react';

import CarouselContainer, { CarouselContainerProps } from './CarouselContainer';
import CarouselOverlay from './CarouselOverlay';
import CarouselProvider, { CarouselProviderProps } from './CarouselProvider';
import CarouselRotator, { CarouselRotatorProps } from './CarouselRotator';

export interface CarouselProps
  extends CarouselRotatorProps,
    Omit<CarouselContainerProps, 'children'>,
    Omit<CarouselProviderProps, 'children'> {}

export default function Carousel({
  children,
  autoPlay,
  initialIndex,
  playInterval,
  ...restProps
}: CarouselProps) {
  return (
    <CarouselProvider autoPlay={autoPlay} initialIndex={initialIndex}>
      <CarouselContainer {...restProps}>
        <CarouselOverlay />
        <CarouselRotator playInterval={playInterval}>
          {children}
        </CarouselRotator>
      </CarouselContainer>
    </CarouselProvider>
  );
}
