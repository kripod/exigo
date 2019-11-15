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
  const [value, setValue] = useState(solution);

  return (
    <Box mx={QUIZ_ITEM_CARD_PADDING}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        <Box as="p" color="gray.500" pb={3}>
          Specify the solution below.
        </Box>

        <NumberInput
          step={stepSize}
          value={value}
          onChange={
            ((nextString: string) => {
              const nextValue =
                nextString.length > 0 ? Number(nextString) : undefined;
              setValue(nextValue);
              onChange({ ...item, solution: nextValue });
            }) as any
          }
        >
          <NumberInputField
            // TODO: Wait until https://github.com/chakra-ui/chakra-ui/pull/243 gets merged
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
