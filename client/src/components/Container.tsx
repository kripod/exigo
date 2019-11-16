import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ContainerProps extends BoxProps {}

export default function Container(props: ContainerProps) {
  return <Box maxWidth="containers.lg" mx="auto" px={4} {...props} />;
}
