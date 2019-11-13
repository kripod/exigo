import { Box, Checkbox, CheckboxGroup, useColorMode } from '@chakra-ui/core';
import React, { useState } from 'react';

import InputFeedback from '../../models/InputFeedback';
import Option from '../../models/Option';
import QuizItemEvaluatorProps from '../../models/QuizItemEvaluatorProps';
import MultipleOptionsQuizItemProps from '../../models/QuizItemProps/MultipleOptionsQuizItemProps';
import getInputFeedbackProps from '../../utils/getInputFeedbackProps';
import { toCardinal } from '../../utils/Number';
import { QUIZ_ITEM_CARD_PADDING } from '../QuizItemCard';

export interface MultipleOptionsEvaluatorProps
  extends QuizItemEvaluatorProps<Option['id'][]>,
    MultipleOptionsQuizItemProps {}

export default function MultipleOptionsEvaluator({
  options,
  constraints = {},
  solution,
  onChange,
}: MultipleOptionsEvaluatorProps) {
  const { colorMode } = useColorMode();
  const preferDarkMode = colorMode === 'dark';

  const { minCount = 1, maxCount = options.length } = constraints;
  const [values, setValues] = useState<string[]>([]);

  let instruction;
  if (maxCount === 1) {
    instruction = 'Choose one of the options below.';
  } else if (maxCount === minCount) {
    instruction = `Select ${toCardinal(maxCount)} from the options below.`;
  } else if (minCount <= 1) {
    instruction = `Select up to ${toCardinal(
      maxCount,
    )} from the options below.`;
  } else {
    instruction = `Select up to ${toCardinal(
      maxCount,
    )}, but at least ${toCardinal(minCount)} from the options below.`;
  }

  return (
    <>
      <Box as="p" color="gray.500" mx={QUIZ_ITEM_CARD_PADDING}>
        {instruction}
      </Box>

      <CheckboxGroup
        value={values}
        onChange={
          ((nextValues: string[]) => {
            if (nextValues.length > maxCount) {
              if (maxCount > 1) return; // TODO: Optionally provide visual feedback
              nextValues.splice(0, nextValues.length - 1);
            }

            setValues(nextValues);
            onChange(
              nextValues.length >= minCount
                ? nextValues.map(Number)
                : undefined,
            );
          }) as any
        }
        spacing={0}
        mt={3}
      >
        {options.map(option => {
          let feedback = InputFeedback.NONE;
          if (solution?.includes(option.id)) {
            feedback = InputFeedback.CORRECT;
          } else if (values.includes(`${option.id}`)) {
            feedback =
              solution != null
                ? InputFeedback.INCORRECT
                : InputFeedback.SELECTED;
          }

          return (
            // TODO: Use 'isReadOnly' prop instead of 'isDisabled'
            // See: https://github.com/chakra-ui/chakra-ui/issues/52
            <Checkbox
              key={option.id}
              value={`${option.id}`}
              isDisabled={solution != null}
              isFullWidth
              position="relative" // TODO: Remove when Chakra UI gets fixed, see: https://github.com/chakra-ui/chakra-ui/issues/212
              px={QUIZ_ITEM_CARD_PADDING}
              py={3}
              {...getInputFeedbackProps(feedback, preferDarkMode)}
            >
              {option.text}
            </Checkbox>
          );
        })}
      </CheckboxGroup>
    </>
  );
}
