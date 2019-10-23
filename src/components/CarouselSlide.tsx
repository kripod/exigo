import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';

// TODO: Follow the status of https://github.com/WICG/inert and remove polyfill
if (typeof window !== 'undefined') {
  import('wicg-inert');
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CarouselSlideProps extends BoxProps {}

export default function CarouselSlide({
  children,
  inert,
  ...restProps
}: CarouselSlideProps) {
  return (
    <Box
      role="group"
      aria-roledescription="slide"
      flex="0 0 100%"
      css={{ scrollSnapAlign: 'center' }}
      {...restProps}
    >
      {/* TODO: Remove extra `div` once `shouldForwardProp` of `Box` supports `inert` */}
      <div
        inert={inert}
        css={{
          height: '100%',
          '& > *': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        }}
      >
        {children}
      </div>
    </Box>
  );
}
