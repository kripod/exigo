import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';

const Measure = React.forwardRef((props: BoxProps, ref) => {
  return <Box ref={ref} maxWidth="2xl" {...props} />;
});

export default Measure;
