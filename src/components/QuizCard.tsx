import { Heading } from '@chakra-ui/core';
import React from 'react';
import { QuizBase } from '../models/Quiz';

export const QUIZ_CARD_PADDING = 5;

interface QuizCardProps extends QuizBase {
  children: React.ReactNode;
}

export default function QuizCard({ item, children }: QuizCardProps) {
  return (
    <>
      <Heading as="h3" size="md" fontWeight={500} m={QUIZ_CARD_PADDING}>
        {item}
      </Heading>

      {children}
    </>
  );
}
