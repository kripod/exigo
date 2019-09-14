import {
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Stack,
} from '@chakra-ui/core';
import React from 'react';
import { QuizItemBase } from '../models/QuizItem';

export const QUIZ_ITEM_CARD_PADDING = 5;

interface QuizItemCardProps extends QuizItemBase {
  children: React.ReactNode;
  onTimeout: () => void;
}

export default function QuizItemCard({
  stem,
  timeLimit,
  children,
}: QuizItemCardProps) {
  return (
    <>
      <Stack
        isInline
        align="center"
        justify="space-between"
        spacing={QUIZ_ITEM_CARD_PADDING}
        m={QUIZ_ITEM_CARD_PADDING}
      >
        <Heading as="h3" size="md" fontWeight={500}>
          {stem}
        </Heading>
        {timeLimit && (
          // TODO: Use timer-based value
          <CircularProgress value={timeLimit * 0.6}>
            <CircularProgressLabel fontSize="md">
              {timeLimit * 0.6}
            </CircularProgressLabel>
          </CircularProgress>
        )}
      </Stack>

      {children}
    </>
  );
}
