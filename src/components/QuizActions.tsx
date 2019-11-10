import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  StackProps,
} from '@chakra-ui/core';
import React, { useRef } from 'react';

import useCarouselControls from '../hooks/useCarouselControls';
import QuizItem from '../models/QuizItem';
import QuizResponses from '../models/QuizResponses';

export interface QuizActionsProps extends StackProps {
  remainingItems: QuizItem[];
  responses: QuizResponses;
  isSurrendering?: boolean;
  onSurrender: (item: QuizItem) => void;
}

export default function QuizActions({
  remainingItems,
  responses,
  isSurrendering = false,
  onSurrender,
  ...restProps
}: QuizActionsProps) {
  const { shownIndex, setShownIndex, totalCount } = useCarouselControls();
  const shownItem = remainingItems[shownIndex];
  const currentResponse = responses[shownItem.id];

  const initialPopoverFocusRef = useRef<HTMLElement>(null);

  function goToNext() {
    setShownIndex(prevIndex => (prevIndex + 1) % totalCount);
  }

  function goToPrev() {
    setShownIndex(prevIndex => (prevIndex - 1 + totalCount) % totalCount);
  }

  return (
    <Stack direction="row-reverse" justify="space-between" {...restProps}>
      <Stack direction="row-reverse">
        <Button
          isDisabled={remainingItems.length === 1 && currentResponse == null}
          aria-label="Next item"
          rightIcon="chevron-right"
          {...(currentResponse != null
            ? { variantColor: 'blue' }
            : { variant: 'outline' })}
          borderWidth={1}
          onClick={!isSurrendering ? goToNext : undefined}
        >
          Next
        </Button>
        <Button
          isDisabled={totalCount === 1}
          aria-label="Previous item"
          leftIcon="chevron-left"
          variant="outline"
          onClick={!isSurrendering ? goToPrev : undefined}
        >
          Previous
        </Button>
      </Stack>

      <Popover initialFocusRef={initialPopoverFocusRef} placement="top">
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Button
                aria-label="Surrender current item"
                leftIcon={'running' as any}
                variant="ghost"
              >
                Surrender
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader fontWeight={600}>Are you sure?</PopoverHeader>
              <PopoverBody>
                You may not revisit this item after surrendering.
              </PopoverBody>
              <PopoverFooter textAlign="right">
                <ButtonGroup size="sm">
                  <Button
                    ref={initialPopoverFocusRef}
                    variant="outline"
                    onClick={onClose}
                  >
                    No, keep trying
                  </Button>
                  <Button
                    variantColor="red"
                    onClick={() => {
                      goToNext();
                      onSurrender(shownItem);
                      if (onClose) onClose(); // TODO: onClose?();
                    }}
                  >
                    Yes
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </>
        )}
      </Popover>
    </Stack>
  );
}
