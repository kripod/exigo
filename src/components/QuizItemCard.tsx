import {
  Box,
  BoxProps,
  Button,
  Flex,
  Heading,
  Stack,
  useColorMode,
} from '@chakra-ui/core';
import React from 'react';
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
        <Button
          aria-label="Next assessment"
          rightIcon="chevron-right"
          variantColor="blue"
        >
          Next
        </Button>
        <Button
          aria-label="Surrender current assessment"
          leftIcon={'running' as any}
          variant="outline"
        >
          Surrender
        </Button>
      </Stack>
    </Card>
  );
}
