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
  StackProps,
} from '@chakra-ui/core';
import React, { useRef } from 'react';

import useCarouselControls from '../hooks/useCarouselControls';
import QuizAnswers from '../models/QuizAnswers';
import QuizItem from '../models/QuizItem';
import QuizNavigator from './QuizNavigator';

export interface QuizEvaluatorActionsProps extends StackProps {
  remainingItems: QuizItem[];
  responses: QuizAnswers;
  disableNavigation?: boolean;
  onCheckAnswer: (item: QuizItem) => void;
  onSurrender: (item: QuizItem) => void;
}

export default function QuizEvaluatorActions({
  remainingItems,
  responses,
  disableNavigation = false,
  onCheckAnswer,
  onSurrender,
  ...restProps
}: QuizEvaluatorActionsProps) {
  const { shownIndex, setShownIndex, totalCount } = useCarouselControls();
  const nextButtonRef = useRef<HTMLElement>(null);
  const initialPopoverFocusRef = useRef<HTMLElement>(null);

  if (remainingItems.length === 0) return null;

  const shownItem = remainingItems[shownIndex];
  const isSolutionShown = shownItem.solution != null;

  const currentResponse = responses[shownItem.id];

  function goToNext() {
    setShownIndex(prevIndex => (prevIndex + 1) % totalCount);
  }

  return (
    <Flex justify="space-between" flexWrap="wrap" {...restProps}>
      <ButtonGroup mr={2} mb={3}>
        <Button
          isDisabled={isSolutionShown || currentResponse == null}
          aria-label="Check answer"
          leftIcon={'glasses' as any}
          {...(!isSolutionShown && { variantColor: 'blue' })}
          variant="outline"
          borderWidth={1}
          onClick={() => {
            onCheckAnswer(shownItem);
            nextButtonRef.current?.focus();
          }}
        >
          Check
        </Button>

        <Popover initialFocusRef={initialPopoverFocusRef} placement="top">
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <Button
                  isDisabled={isSolutionShown}
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
      </ButtonGroup>

      <QuizNavigator
        remainingItems={remainingItems}
        responses={responses}
        disableActions={disableNavigation}
        onCheckAnswer={onCheckAnswer}
        onSurrender={onSurrender}
      />
    </Flex>
  );
}
