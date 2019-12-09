// TODO: Replace this with Chakra's regular component once typings are fixed

import { Scale, ScaleProps as ChakraScaleProps } from '@chakra-ui/core';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ScaleProps extends Omit<ChakraScaleProps, 'children' | 'items'> {
  children: (styles: Record<string, any>) => React.ReactNode;
}

export default Scale as React.FC<ScaleProps>;
