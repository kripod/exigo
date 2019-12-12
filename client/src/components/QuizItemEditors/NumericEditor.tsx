import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/core';
import React, { useState } from 'react';

import NumericQuizItem from '../../models/QuizItems/NumericQuizItem';
import { QUIZ_ITEM_CARD_PADDING } from '../QuizItemCard';
import QuizItemEditorProps from '../QuizItemEditorProps';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NumericEditorProps
  extends QuizItemEditorProps<NumericQuizItem> {}

export default function NumericEditor({ item, onChange }: NumericEditorProps) {
  const { precision, stepSize = 1, constraints = {}, solution } = item;
  const [value, setValue] = useState(solution ?? null);

  return (
    <Box mx={QUIZ_ITEM_CARD_PADDING}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        <Box as="p" color="gray.500" pb={3}>
          Specify the solution below.
        </Box>

        <NumberInput
          step={stepSize}
          // TODO: Resolve https://github.com/chakra-ui/chakra-ui/issues/278
          value={(value ?? '') as any}
          onChange={nextValue => {
            setValue(nextValue);
            onChange({
              ...item,
              solution: nextValue ? Number(nextValue) : undefined,
            });
          }}
        >
          <NumberInputField
            placeholder={`e.g. ${
              precision ? `0.${'0'.repeat(precision)}` : '0'
            }`}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </label>
    </Box>
  );
}
