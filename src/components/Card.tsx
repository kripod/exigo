import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';

export default function Card(props: BoxProps) {
  return <Box overflow="hidden" bg="white" borderRadius="lg" {...props} />;
}
