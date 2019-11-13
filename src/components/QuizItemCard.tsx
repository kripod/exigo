import { Box, BoxProps, Flex, Heading, Text } from '@chakra-ui/core';
import React from 'react';

import { QuizItemBase } from '../models/QuizItem';
import Card from './Card';

export const QUIZ_ITEM_CARD_PADDING = 6;

interface QuizItemCardProps extends Omit<QuizItemBase, 'id'>, BoxProps {
  shownIndex: number;
  totalCount: number;
}

export default function QuizItemCard({
  stem,
  shownIndex,
  totalCount,
  children,
  ...restProps
}: QuizItemCardProps) {
  return (
    <Card as={Flex} flexDirection="column" boxShadow="lg" {...restProps}>
      <Text
        textTransform="uppercase"
        letterSpacing={2}
        fontSize="sm"
        color="gray.500"
        mx={QUIZ_ITEM_CARD_PADDING}
        mt={QUIZ_ITEM_CARD_PADDING + 2}
      >
        Item #{shownIndex + 1} of {totalCount}
      </Text>
      <Heading
        as="h3"
        size="md"
        mx={QUIZ_ITEM_CARD_PADDING}
        my={2}
        pb={QUIZ_ITEM_CARD_PADDING + 2}
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
