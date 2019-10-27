import { Link as ChakraLink, LinkProps } from '@chakra-ui/core';
import { Link as GatsbyLink } from 'gatsby';
import React from 'react';

export default function Link({ href, isExternal, ...restProps }: LinkProps) {
  return (
    // TODO: Don't opt out from type checking once `ChakraLink` gets fixed
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    <ChakraLink
      {...(isExternal ? { href } : { as: GatsbyLink, to: href })}
      {...restProps}
    />
  );
}
