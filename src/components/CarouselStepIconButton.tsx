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
  const { jump } = useCarouselControls();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  // TODO: Disable button if necessary when the carousel is not infinite
  return (
    <IconButton
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
