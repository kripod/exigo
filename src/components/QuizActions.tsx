import React from 'react';
import { Button, Stack, StackProps } from '@chakra-ui/core';
import useCarouselControls from '../hooks/useCarouselControls';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QuizActionsProps extends StackProps {}

export default function QuizActions(props: QuizActionsProps) {
  const { shownIndex, setShownIndex, totalCount } = useCarouselControls();

  return (
    <Stack direction="row-reverse" justify="space-between" {...props}>
      <Stack direction="row-reverse">
        <Button
          isDisabled={shownIndex === totalCount - 1}
          aria-label="Next assessment"
          rightIcon="chevron-right"
          variantColor="blue"
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
