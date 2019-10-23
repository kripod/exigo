import { IconButton, IconButtonProps, useColorMode } from '@chakra-ui/core';
import React, { useCallback } from 'react';
import useCarouselControls from '../hooks/useCarouselControls';

export interface CarouselStepIconButtonProps extends IconButtonProps {
  delta: number;
}

export default function CarouselStepIconButton({
  delta,
  ...props
}: CarouselStepIconButtonProps) {
  const {
    isInfinite,
    activeIndex,
    getTotalCount,
    jump,
  } = useCarouselControls();
  const nextIndex = activeIndex + delta;

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <IconButton
      isDisabled={
        !isInfinite && (nextIndex < 0 || nextIndex >= getTotalCount())
      }
      variantColor={isDarkMode ? 'whiteAlpha' : 'blackAlpha'}
      color="white"
      size="lg"
      fontSize="3xl"
      isRound
      onClick={useCallback(() => {
        jump(delta);
      }, [delta, jump])}
      {...props}
    />
  );
}
