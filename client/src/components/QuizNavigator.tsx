import { Button, ButtonGroup, ButtonGroupProps } from '@chakra-ui/core';
import React, { useRef } from 'react';

import useCarouselControls from '../hooks/useCarouselControls';
import QuizAnswers from '../models/QuizAnswers';
import QuizItem from '../models/QuizItem';

export interface QuizNavigatorProps extends ButtonGroupProps {
  remainingItems: QuizItem[];
  responses: QuizAnswers;
  disableActions?: boolean;
  onCheckAnswer: (item: QuizItem) => void;
  onSurrender: (item: QuizItem) => void;
}

export default function QuizNavigator({
  remainingItems,
  responses,
  disableActions = false,
  onCheckAnswer,
  onSurrender,
  ...restProps
}: QuizNavigatorProps) {
  const { shownIndex, setShownIndex, totalCount } = useCarouselControls();
  const shownItem = remainingItems[shownIndex];
  const currentResponse = responses[shownItem.id];

  const nextButtonRef = useRef<HTMLElement>(null);

  function goToNext() {
    setShownIndex(prevIndex => (prevIndex + 1) % totalCount);
  }

  function goToPrev() {
    setShownIndex(prevIndex => (prevIndex - 1 + totalCount) % totalCount);
  }

  return (
    <ButtonGroup {...restProps}>
      <Button
        isDisabled={totalCount === 1}
        aria-label="Previous item"
        leftIcon="chevron-left"
        variant="outline"
        onClick={!disableActions ? goToPrev : undefined}
      >
        Previous
      </Button>

      <Button
        ref={nextButtonRef}
        isDisabled={remainingItems.length === 1 && currentResponse == null}
        aria-label="Next item"
        rightIcon="chevron-right"
        variant="outline"
        onClick={!disableActions ? goToNext : undefined}
      >
        Next
      </Button>
    </ButtonGroup>
  );
}
