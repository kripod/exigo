import { BoxProps, Button, Heading, Stack } from '@chakra-ui/core';
import React from 'react';
import { QuizItemBase } from '../models/QuizItem';
import Card from './Card';
import Measure from './Measure';

export const QUIZ_ITEM_CARD_PADDING = 5;

interface QuizItemCardProps extends QuizItemBase, BoxProps {
  children: React.ReactNode;
}

export default function QuizItemCard({
  stem,
  children,
  ...restProps
}: QuizItemCardProps) {
  return (
    <Card as={Measure} {...restProps}>
      <Heading as="h3" size="md" fontWeight={500} p={QUIZ_ITEM_CARD_PADDING}>
        {stem}
      </Heading>

      {children}

      {/* TODO: isReversed, see https://github.com/chakra-ui/chakra-ui/issues/189 */}
      <Stack isInline justify="space-between" p={QUIZ_ITEM_CARD_PADDING}>
        <Button variantColor="blue">Next</Button>
        <Button variant="ghost">Surrender</Button>
      </Stack>
    </Card>
  );
}
