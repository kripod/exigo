import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';

export default function CarouselContainer(props: BoxProps) {
  return <Box as="section" aria-roledescription="carousel" {...props} />;
}
