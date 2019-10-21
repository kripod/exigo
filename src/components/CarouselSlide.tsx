import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';

// TODO: Follow the status of https://github.com/WICG/inert and remove polyfill
import 'wicg-inert';

export default function CarouselSlide({
  children,
  inert,
  ...restProps
}: BoxProps) {
  return (
    <Box
      role="group"
      aria-roledescription="slide"
      flex="0 0 100%"
      css={{ scrollSnapAlign: 'center' }}
      {...restProps}
    >
      {/* TODO: Remove extra `div` once `shouldForwardProp` of `Box` supports `inert` */}
      <div inert={inert}>{children}</div>
    </Box>
  );
}
