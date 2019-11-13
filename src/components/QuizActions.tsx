import {
  Button,
  ButtonGroup,
  Flex,
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
  disableNavigation?: boolean;
  onSurrender: (item: QuizItem) => void;
}

export default function QuizActions({
  remainingItems,
  responses,
  disableNavigation = false,
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
          onClick={!disableNavigation ? goToNext : undefined}
        >
          Next
        </Button>

        <Button
          isDisabled={currentResponse == null}
          aria-label="Check response"
          rightIcon={'glasses' as any}
          variant="outline"
          {...(currentResponse != null && { variantColor: 'blue' })}
          borderWidth={1}
          onClick={undefined} // TODO
        >
          Check
        </Button>
      </Stack>

      <Flex direction="row-reverse">
        <Popover initialFocusRef={initialPopoverFocusRef} placement="top">
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <Button
                  aria-label="Surrender current item"
                  leftIcon={'running' as any}
                  variant="ghost"
                  ml={2}
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

        <Button
          isDisabled={totalCount === 1}
          aria-label="Previous item"
          leftIcon="chevron-left"
          variant="outline"
          onClick={!disableNavigation ? goToPrev : undefined}
        >
          Previous
        </Button>
      </Flex>
    </Stack>
  );
}
