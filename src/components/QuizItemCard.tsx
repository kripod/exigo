import {
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Stack,
} from '@chakra-ui/core';
import React from 'react';
import { QuizItemBase } from '../models/QuizItem';
import Measure from './Measure';

export const QUIZ_ITEM_CARD_PADDING = 5;

interface QuizItemCardProps extends QuizItemBase {
  children: React.ReactNode;
}

export default function QuizItemCard({ stem, children }: QuizItemCardProps) {
  return (
    <Measure boxShadow="md">
      <Heading as="h3" size="md" fontWeight={500} p={QUIZ_ITEM_CARD_PADDING}>
        {stem}
      </Heading>

      {children}
    </Measure>
  );
}
