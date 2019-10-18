import { Box, BoxProps, Button, useColorMode } from '@chakra-ui/core';
import React from 'react';

export default function Header(props: BoxProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="header" {...props}>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </Box>
  );
}
