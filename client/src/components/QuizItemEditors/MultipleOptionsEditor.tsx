import { Box, Checkbox, CheckboxGroup, useColorMode } from '@chakra-ui/core';
import React, { useState } from 'react';

import InputFeedback from '../../models/InputFeedback';
import MultipleOptionsQuizItem from '../../models/QuizItems/MultipleOptionsQuizItem';
import getInputFeedbackProps from '../../utils/getInputFeedbackProps';
import { QUIZ_ITEM_CARD_PADDING } from '../QuizItemCard';
import QuizItemEditorProps from '../QuizItemEditorProps';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MultipleOptionsEditorProps
  extends QuizItemEditorProps<MultipleOptionsQuizItem> {}

export default function MultipleOptionsEditor({
  item,
  onChange,
}: MultipleOptionsEditorProps) {
  const { colorMode } = useColorMode();
  const preferDarkMode = colorMode === 'dark';

  const { options, solution } = item;
  const [values, setValues] = useState<string[]>(solution || []);

  return (
    <>
      <Box as="p" color="gray.500" mx={QUIZ_ITEM_CARD_PADDING}>
        Specify the solution by selecting all the correct options below.
      </Box>

      <CheckboxGroup
        value={values}
        onChange={
          ((nextValues: string[]) => {
            setValues(nextValues);
            onChange({ ...item, solution: nextValues });
          }) as any
        }
        spacing={0}
        mt={3}
      >
        {options.map(option => {
          const feedback = values.includes(`${option.id}`)
            ? InputFeedback.CORRECT
            : InputFeedback.NONE;

          return (
            // TODO: Use 'isReadOnly' prop instead of 'isDisabled'
            // See: https://github.com/chakra-ui/chakra-ui/issues/52
            <Checkbox
              key={option.id}
              value={`${option.id}`}
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
