import { Checkbox, CheckboxGroup, useColorMode } from '@chakra-ui/core';
import React, { useState } from 'react';
import MultipleOptionsQuizItemProps from '../models/MultipleOptionsQuizItemProps';
import Option from '../models/Option';
import { QUIZ_ITEM_CARD_PADDING } from './QuizItemCard';

interface MultipleOptionsEvaluatorProps extends MultipleOptionsQuizItemProps {
  showSolution?: boolean;
  onChange: (response: Option['id'][] | undefined) => void;
}

export default function MultipleOptionsEvaluator({
  options,
  constraints = {},
  solution,
  showSolution,
  onChange,
}: MultipleOptionsEvaluatorProps) {
  const { colorMode } = useColorMode();
  const preferDarkMode = colorMode === 'dark';

  const [values, setValues] = useState<string[]>([]);

  return (
    <CheckboxGroup
      value={values}
      onChange={
        ((nextValues: string[]) => {
          const { minCount = 1, maxCount } = constraints;

          if (maxCount && nextValues.length > maxCount) {
            if (maxCount > 1) return; // TODO: Optionally provide visual feedback
            nextValues.splice(0, nextValues.length - 1);
          }

          setValues(nextValues);
          onChange(
            nextValues.length >= minCount ? nextValues.map(Number) : undefined,
          );
        }) as any
      }
      spacing={0}
    >
      {options.map(option => {
        let color;
        // TODO: solutionIDs?.includes(option.id)
        if (showSolution && solution && solution.includes(option.id)) {
          color = 'green';
        } else if (values.includes(`${option.id}`)) {
          color = showSolution ? 'red' : 'blue';
        }

        // TODO: embed bgColor = color ?? `${color}.${preferDarkMode ? 800 : 100}`;
        let bgColor;
        if (color) {
          bgColor = `${color}.${preferDarkMode ? 800 : 100}`;
        }

        return (
          // TODO: Use 'isReadOnly' prop instead of 'isDisabled'
          // See: https://github.com/chakra-ui/chakra-ui/issues/52
          <Checkbox
            key={option.id}
            value={`${option.id}`}
            isDisabled={showSolution}
            isFullWidth
            position="relative" // TODO: Remove when Chakra UI gets fixed, see: https://github.com/chakra-ui/chakra-ui/issues/212
            px={QUIZ_ITEM_CARD_PADDING}
            py={3}
            color={color}
            bg={bgColor}
          >
            {option.text}
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
}
