import { IconButton, IconButtonProps } from '@chakra-ui/core';
import React from 'react';

export default function CarouselStepIconButton(props: IconButtonProps) {
  return <IconButton variant="ghost" size="lg" isRound {...props} />;
}
