import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Stack,
  useColorMode,
} from '@chakra-ui/core';
import React from 'react';
import useCarouselControls from '../hooks/useCarouselControls';
import { QuizItemBase } from '../models/QuizItem';
import Card from './Card';

export const QUIZ_ITEM_CARD_PADDING = 6;

interface QuizItemCardProps extends Omit<QuizItemBase, 'id'>, BoxProps {}

export default function QuizItemCard({
  stem,
  children,
  ...restProps
}: QuizItemCardProps) {
  const { colorMode } = useColorMode();
  const preferDarkMode = colorMode === 'dark';

  const { shownIndex, setShownIndex, totalCount } = useCarouselControls();

  return (
    <Card as={Flex} flexDirection="column" boxShadow="lg" {...restProps}>
      <Heading
        as="h3"
        size="md"
        mx={QUIZ_ITEM_CARD_PADDING}
        py={QUIZ_ITEM_CARD_PADDING + 2}
        fontWeight={500}
        lineHeight={1.5}
        borderBottomWidth={1}
      >
        {stem}
      </Heading>

      <Box flex={1} my={QUIZ_ITEM_CARD_PADDING - 1}>
        {children}
      </Box>

      <Stack
        direction="row-reverse"
        justify="space-between"
        px={QUIZ_ITEM_CARD_PADDING}
        py={QUIZ_ITEM_CARD_PADDING - 1}
        bg={`gray.${preferDarkMode ? 900 : 50}`}
      >
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
    </Card>
  );
}
