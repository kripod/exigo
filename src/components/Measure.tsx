import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';

export default function Measure(props: BoxProps) {
  return <Box maxWidth="2xl" {...props} />;
}
