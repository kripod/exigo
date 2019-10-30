import React, { useRef } from 'react';
import {
  Button,
  ButtonGroup,
  Stack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  StackProps,
} from '@chakra-ui/core';
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

  const initialPopoverFocusRef = useRef<HTMLElement>(null);

  return (
    <Stack direction="row-reverse" justify="space-between" {...restProps}>
      <Stack direction="row-reverse">
        <Button
          isDisabled={shownIndex === totalCount - 1}
          aria-label="Next item"
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
          aria-label="Previous item"
          leftIcon="chevron-left"
          variant="outline"
          onClick={() => {
            setShownIndex(shownIndex - 1);
          }}
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
                  <Button variantColor="red">Yes</Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </>
        )}
      </Popover>
    </Stack>
  );
}
