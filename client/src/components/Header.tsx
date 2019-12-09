import { Box, BoxProps, Flex, IconButton, useColorMode } from '@chakra-ui/core';
import React from 'react';

import Logo from '../assets/logo.svg';
import Container from './Container';
import Link from './Link';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps extends BoxProps {}

export default function Header(props: HeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const preferDarkMode = colorMode === 'dark';

  return (
    <Box as="header" boxShadow="md" py={2} {...props}>
      <Container as={Flex} justifyContent="space-between" alignItems="center">
        <Link href="/" aria-label="Homepage" py={2}>
          <Logo alt="" height="2em" />
        </Link>

        <IconButton
          variant="ghost"
          aria-label={`Switch to ${
            preferDarkMode ? 'light' : 'dark'
          } color scheme`}
          icon={preferDarkMode ? 'sun' : 'moon'}
          onClick={toggleColorMode}
        />
      </Container>
    </Box>
  );
}
