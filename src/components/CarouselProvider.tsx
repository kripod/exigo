import React, { useState } from 'react';
import CarouselContext from './CarouselContext';

export interface CarouselProviderProps {
  isInfinite?: boolean;
  autoPlay?: boolean;
  initialIndex?: number;
  children: React.ReactNode;
}

export default function CarouselProvider({
  isInfinite = false,
  autoPlay = false,
  initialIndex = 0,
  children,
}: CarouselProviderProps) {
  return (
    <CarouselContext.Provider
      value={[
        useState<boolean>(false),
        useState<boolean>(false),
        useState<boolean>(false),
        useState(initialIndex),
        useState(initialIndex + 1),
        useState(autoPlay),
        isInfinite,
      ]}
    >
      {children}
    </CarouselContext.Provider>
  );
}
