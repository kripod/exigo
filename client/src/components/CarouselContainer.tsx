import { Box, BoxProps } from '@chakra-ui/core';
import React, { useContext, useEffect } from 'react';
import { useFocus, useHover } from 'web-api-hooks';

import CarouselContext from './CarouselContext';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CarouselContainerProps extends BoxProps {}

export default function CarouselContainer(props: CarouselContainerProps) {
  const [[, setHovered], [, setFocused]] = useContext(CarouselContext);

  const [isHovered, bindHover] = useHover();
  useEffect(() => {
    setHovered(isHovered);
  }, [isHovered, setHovered]);

  const [isFocused, bindFocus] = useFocus();
  useEffect(() => {
    setFocused(isFocused);
  }, [isFocused, setFocused]);

  return (
    <Box
      as="section"
      aria-roledescription="carousel"
      position="relative"
      {...bindHover}
      {...bindFocus}
      {...props}
    />
  );
}
