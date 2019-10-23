import { Box, BoxProps } from '@chakra-ui/core';
import React, { useState } from 'react';
import CarouselContext from './CarouselContext';
import useFocus from '../hooks/useFocus';
import useHover from '../hooks/useHover';

export interface CarouselContainerProps extends BoxProps {
  isInfinite?: boolean;
  autoPlay?: boolean;
  initialIndex?: number;
}

export default function CarouselContainer({
  isInfinite = false,
  autoPlay = false,
  initialIndex = 0,
  ...restProps
}: CarouselContainerProps) {
  const [isFocused, bindFocus] = useFocus();
  const [isHovered, bindHover] = useHover();

  const [ignoreUserInteracting, setIgnoreUserInteracting] = useState(false);

  return (
    <CarouselContext.Provider
      value={[
        [
          ignoreUserInteracting,
          (value: boolean) => {
            if (value !== ignoreUserInteracting) {
              setIgnoreUserInteracting(value);
            }
          },
        ],
        isFocused || isHovered,
        useState(initialIndex),
        useState<HTMLElement[]>([]),
        useState(autoPlay),
        isInfinite,
      ]}
    >
      <Box
        as="section"
        aria-roledescription="carousel"
        position="relative"
        {...bindFocus}
        {...bindHover}
        {...restProps}
      />
    </CarouselContext.Provider>
  );
}
