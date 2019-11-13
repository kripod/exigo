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
import QuizAnswers from '../models/QuizAnswers';
import QuizItem from '../models/QuizItem';

export interface QuizActionsProps extends StackProps {
  remainingItems: QuizItem[];
  responses: QuizAnswers;
  disableNavigation?: boolean;
  onCheckAnswer: (item: QuizItem) => void;
  onSurrender: (item: QuizItem) => void;
}

export default function QuizActions({
  remainingItems,
  responses,
  disableNavigation = false,
  onCheckAnswer,
  onSurrender,
  ...restProps
}: QuizActionsProps) {
  const { shownIndex, setShownIndex, totalCount } = useCarouselControls();
  const shownItem = remainingItems[shownIndex];
  const currentResponse = responses[shownItem.id];

  const initialPopoverFocusRef = useRef<HTMLElement>(null);
  const isSolutionShown = shownItem.solution != null;
  const isCheckAnswerButtonDisabled =
    isSolutionShown || currentResponse == null;

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
          {...(isSolutionShown
            ? { variantColor: 'blue' }
            : { variant: 'outline' })}
          borderWidth={1}
          onClick={!disableNavigation ? goToNext : undefined}
        >
          Next
        </Button>

        <Button
          isDisabled={isCheckAnswerButtonDisabled}
          aria-label="Check answer"
          rightIcon={'glasses' as any}
          variant="outline"
          {...(!isCheckAnswerButtonDisabled && { variantColor: 'blue' })}
          borderWidth={1}
          onClick={() => onCheckAnswer(shownItem)}
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
                  isDisabled={isSolutionShown}
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
