import React from 'react';
import { Button, Stack, StackProps } from '@chakra-ui/core';
import useCarouselControls from '../hooks/useCarouselControls';
import QuizItem from '../models/QuizItem';
import QuizResponses from '../models/QuizResponses';

export interface QuizActionsProps extends StackProps {
  items: QuizItem[];
  responses: QuizResponses;
}

export default function QuizActions({
  items,
  responses,
  ...restProps
}: QuizActionsProps) {
  const { shownIndex, setShownIndex, totalCount } = useCarouselControls();
  const shownItem = items[shownIndex];
  const currentResponse = responses[shownItem.id];

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
          borderWidth={1}
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
