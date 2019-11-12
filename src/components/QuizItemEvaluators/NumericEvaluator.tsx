import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useColorMode,
} from '@chakra-ui/core';
import React, { useState } from 'react';

import NumericQuizItemProps from '../../models/QuizItemProps/NumericQuizItemProps';
import { QUIZ_ITEM_CARD_PADDING } from '../QuizItemCard';

interface NumericEvaluatorProps extends NumericQuizItemProps {
  showSolution?: boolean;
  onChange: (response: number | undefined) => void;
}

export default function NumericEvaluator({
  precision = 0,
  stepSize = 1,
  constraints = {},
  solution,
  showSolution, // TODO
  onChange,
}: NumericEvaluatorProps) {
  const { colorMode } = useColorMode();
  const preferDarkMode = colorMode === 'dark';

  const { minValue, maxValue } = constraints;
  const [value, setValue] = useState<number>();

  let instruction;
  if (minValue != null && maxValue != null) {
    instruction = `Specify a value between ${minValue} and ${maxValue} below.`;
  } else if (minValue != null) {
    instruction = `Specify a value greater than or equal to ${minValue} below.`;
  } else if (maxValue != null) {
    instruction = `Specify a value less than or equal to ${maxValue} below.`;
  } else {
    instruction = 'Specify a value below.';
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        <Box as="p" color="gray.500" mx={QUIZ_ITEM_CARD_PADDING} pb={3}>
          {instruction}
        </Box>

        <NumberInput
          precision={precision}
          step={stepSize}
          min={minValue}
          max={maxValue}
          value={value}
          mx={QUIZ_ITEM_CARD_PADDING}
          onChange={setValue as any}
        >
          <NumberInputField
            // TODO: Wait until https://github.com/chakra-ui/chakra-ui/pull/243 gets merged
            placeholder={`e.g. ${
              precision > 0 ? `0.${'0'.repeat(precision)}` : '0'
            }}`}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </label>
    </>
  );
}
