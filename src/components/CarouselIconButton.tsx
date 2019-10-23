import { IconButton, IconButtonProps, useColorMode } from '@chakra-ui/core';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CarouselIconButtonProps extends IconButtonProps {}

export default function CarouselIconButton(props: CarouselIconButtonProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <IconButton
      variantColor={isDarkMode ? 'whiteAlpha' : 'blackAlpha'}
      color="white"
      size="lg"
      fontSize="3xl"
      isRound
      {...props}
    />
  );
}
