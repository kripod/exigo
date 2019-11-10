import { Box, BoxProps, Flex, Heading } from '@chakra-ui/core';
import React from 'react';

import { QuizItemBase } from '../models/QuizItem';
import Card from './Card';

export const QUIZ_ITEM_CARD_PADDING = 6;

interface QuizItemCardProps extends Omit<QuizItemBase, 'id'>, BoxProps {}

export default function QuizItemCard({
  stem,
  children,
  ...restProps
}: QuizItemCardProps) {
  return (
    <Card as={Flex} flexDirection="column" boxShadow="lg" {...restProps}>
      <Heading
        as="h3"
        size="md"
        mx={QUIZ_ITEM_CARD_PADDING}
        mb={2}
        py={QUIZ_ITEM_CARD_PADDING + 2}
        fontWeight={600}
        lineHeight={1.5}
        whiteSpace="pre-line"
        borderBottomWidth={1}
      >
        {stem}
      </Heading>

      <Box flex={1} my={QUIZ_ITEM_CARD_PADDING - 1}>
        {children}
      </Box>
    </Card>
  );
}
