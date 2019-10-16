import { BoxProps, Heading } from '@chakra-ui/core';
import React from 'react';
import { QuizItemBase } from '../models/QuizItem';
import Measure from './Measure';

export const QUIZ_ITEM_CARD_PADDING = 5;

interface QuizItemCardProps extends QuizItemBase, BoxProps {
  children: React.ReactNode;
}

export default function QuizItemCard({
  stem,
  children,
  ...props
}: QuizItemCardProps) {
  return (
    <Measure boxShadow="md" {...props}>
      <Heading as="h3" size="md" fontWeight={500} p={QUIZ_ITEM_CARD_PADDING}>
        {stem}
      </Heading>

      {children}
    </Measure>
  );
}
