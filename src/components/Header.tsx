import { Box, BoxProps, Button, Flex, useColorMode } from '@chakra-ui/core';
import React from 'react';

import Logo from '../assets/logo.svg';
import Container from './Container';
import Link from './Link';

export default function Header(props: BoxProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="header" boxShadow="md" px={4} py={2} {...props}>
      <Container as={Flex} justifyContent="space-between" alignItems="center">
        <Link href="/" aria-label="Homepage" py={2}>
          <Logo alt="" height="2em" />
        </Link>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </Container>
    </Box>
  );
}
