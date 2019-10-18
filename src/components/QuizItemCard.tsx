import { Box, BoxProps, Button, Heading, Stack } from '@chakra-ui/core';
import React from 'react';
import { QuizItemBase } from '../models/QuizItem';
import Card from './Card';
import Measure from './Measure';

export const QUIZ_ITEM_CARD_PADDING = 6;

interface QuizItemCardProps extends QuizItemBase, BoxProps {
  children: React.ReactNode;
}

export default function QuizItemCard({
  stem,
  children,
  ...restProps
}: QuizItemCardProps) {
  return (
    <Card as={Measure} boxShadow="xl" {...restProps}>
      <Heading
        as="h3"
        size="md"
        fontWeight={500}
        mx={QUIZ_ITEM_CARD_PADDING}
        py={QUIZ_ITEM_CARD_PADDING + 2}
        borderBottomWidth={1}
      >
        {stem}
      </Heading>

      <Box my={QUIZ_ITEM_CARD_PADDING - 1}>{children}</Box>

      {/* TODO: isReversed, see https://github.com/chakra-ui/chakra-ui/issues/189 */}
      <Stack
        isInline
        justify="space-between"
        px={QUIZ_ITEM_CARD_PADDING}
        py={QUIZ_ITEM_CARD_PADDING - 1}
        bg="gray.50"
      >
        <Button leftIcon={'running' as any} variant="outline">
          Surrender
        </Button>
        <Button rightIcon="chevron-right" variantColor="blue">
          Next
        </Button>
      </Stack>
    </Card>
  );
}
