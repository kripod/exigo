import { Heading } from '@chakra-ui/core';
import React from 'react';
import { QuizItemBase } from '../models/QuizItem';

export const QUIZ_ITEM_CARD_PADDING = 5;

interface QuizItemCardProps extends QuizItemBase {
  children: React.ReactNode;
}

export default function QuizItemCard({ stem, children }: QuizItemCardProps) {
  return (
    <>
      <Heading as="h3" size="md" fontWeight={500} m={QUIZ_ITEM_CARD_PADDING}>
        {stem}
      </Heading>

      {children}
    </>
  );
}
