import React, { useState } from 'react';

import CarouselContext from './CarouselContext';

export interface CarouselProviderProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  initialIndex?: number;
}

export default function CarouselProvider({
  children,
  autoPlay = false,
  initialIndex = 0,
}: CarouselProviderProps) {
  return (
    <CarouselContext.Provider
      value={[
        useState<boolean>(false),
        useState<boolean>(false),
        useState<boolean>(false),
        useState(initialIndex),
        useState<number | null>(null),
        useState(initialIndex + 1),
        useState(autoPlay),
      ]}
    >
      {children}
    </CarouselContext.Provider>
  );
}
