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

import InputFeedback from '../../models/InputFeedback';
import NumericQuizItem from '../../models/QuizItems/NumericQuizItem';
import getInputFeedbackProps from '../../utils/getInputFeedbackProps';
import { QUIZ_ITEM_CARD_PADDING } from '../QuizItemCard';
import QuizItemEvaluatorProps from '../QuizItemEvaluatorProps';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NumericEvaluatorProps
  extends QuizItemEvaluatorProps<NumericQuizItem> {}

export default function NumericEvaluator({
  item: { precision = 0, stepSize = 1, constraints = {}, solution },
  onChange,
}: NumericEvaluatorProps) {
  const { colorMode } = useColorMode();
  const preferDarkMode = colorMode === 'dark';

  const { minValue, maxValue } = constraints;
  const [valueString, setValueString] = useState<string | null>(null);
  const value = valueString ? Number(valueString) : null;

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

  let feedback = InputFeedback.NONE;
  if (solution != null && value != null) {
    feedback =
      value === solution ? InputFeedback.CORRECT : InputFeedback.INCORRECT;
  }

  return (
    <Box mx={QUIZ_ITEM_CARD_PADDING}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        <Box as="p" color="gray.500" pb={3}>
          {instruction}
        </Box>

        <NumberInput
          precision={precision}
          step={stepSize}
          min={minValue ?? undefined}
          max={maxValue ?? undefined}
          // TODO: Resolve https://github.com/chakra-ui/chakra-ui/issues/278
          value={(valueString ?? '') as any}
          isReadOnly={solution != null}
          bg={getInputFeedbackProps(feedback, preferDarkMode).backgroundColor}
          onChange={
            ((nextValueString: string | null) => {
              setValueString(nextValueString);
              const nextValue = nextValueString
                ? Number(nextValueString)
                : null;
              if (nextValue !== value) {
                onChange(nextValue ?? undefined);
              }
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

      {solution != null && value !== solution && (
        <Box as="p" mt={5}>
          The solution is:{' '}
          <Box as="span" fontWeight={600}>
            {solution}
          </Box>
        </Box>
      )}
    </Box>
  );
}
