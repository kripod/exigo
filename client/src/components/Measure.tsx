import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MeasureProps extends BoxProps {}

const Measure = React.forwardRef((props: MeasureProps, ref) => {
  return <Box ref={ref} maxWidth="2xl" {...props} />;
});

export default Measure;
