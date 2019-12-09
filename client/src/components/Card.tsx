import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CardProps extends BoxProps {}

export default function Card(props: BoxProps) {
  return <Box overflow="hidden" borderWidth={1} borderRadius="lg" {...props} />;
}
