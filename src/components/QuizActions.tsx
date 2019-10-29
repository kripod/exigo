import React from 'react';
import { Button, Stack, StackProps } from '@chakra-ui/core';
import useCarouselControls from '../hooks/useCarouselControls';
import QuizResponses from '../models/QuizResponses';

export interface QuizActionsProps extends StackProps {
  currentResponse: QuizResponses[keyof QuizResponses];
}

export default function QuizActions({
  currentResponse,
  ...restProps
}: QuizActionsProps) {
  const { shownIndex, setShownIndex, totalCount } = useCarouselControls();

  return (
    <Stack direction="row-reverse" justify="space-between" {...restProps}>
      <Stack direction="row-reverse">
        <Button
          isDisabled={shownIndex === totalCount - 1}
          aria-label="Next assessment"
          rightIcon="chevron-right"
          {...(currentResponse != null
            ? { variantColor: 'blue' }
            : { variant: 'outline' })}
          onClick={() => {
            setShownIndex(shownIndex + 1);
          }}
        >
          Next
        </Button>
        <Button
          isDisabled={shownIndex === 0}
          aria-label="Previous assessment"
          leftIcon="chevron-left"
          variant="outline"
          onClick={() => {
            setShownIndex(shownIndex - 1);
          }}
        >
          Previous
        </Button>
      </Stack>

      <Button
        aria-label="Surrender current assessment"
        leftIcon={'running' as any}
        variant="ghost"
      >
        Surrender
      </Button>
    </Stack>
  );
}
