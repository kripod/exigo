import { IconButton, IconButtonProps } from '@chakra-ui/core';
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

  // TODO: Disable button if necessary when the carousel is not infinite
  return (
    <IconButton
      variant="ghost"
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
