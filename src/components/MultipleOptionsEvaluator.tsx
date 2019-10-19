import { Checkbox, CheckboxGroup, useColorMode } from '@chakra-ui/core';
import React, { useState } from 'react';
import MultipleOptionsQuizItemProps from '../models/MultipleOptionsQuizItemProps';
import Option from '../models/Option';
import { QUIZ_ITEM_CARD_PADDING } from './QuizItemCard';

interface MultipleOptionsEvaluatorProps extends MultipleOptionsQuizItemProps {
  showSolution?: boolean;
  onChange: (response: Option['id'][]) => void;
}

export default function MultipleOptionsEvaluator({
  options,
  constraints = {},
  solution,
  showSolution,
  onChange,
}: MultipleOptionsEvaluatorProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const [response, setResponse] = useState<Option['id'][]>([]);

  return (
    <CheckboxGroup
      // value={response}
      onChange={
        ((values: any[]) => {
          let optionIDs: Option['id'][] = values.map(Number);

          // TODO: Leverage optional chaining with TypeScript 3.7
          const { minCount, maxCount } = constraints;
          if (maxCount && values.length > maxCount) {
            if (maxCount > 1) return; // TODO: Optionally provide visual feedback
            optionIDs = optionIDs.slice(-1);
          }

          setResponse(optionIDs);
          onChange(optionIDs);
        }) as any
      }
      spacing={0}
    >
      {options.map(option => {
        let color;
        // TODO: solutionIDs?.includes(option.id)
        if (showSolution && solution && solution.includes(option.id)) {
          color = 'green';
        } else if (response.includes(option.id)) {
          color = showSolution ? 'red' : 'blue';
        }

        // TODO: embed bgColor = color ?? `${color}.${isDarkMode ? 800 : 100}`;
        let bgColor;
        if (color) {
          bgColor = `${color}.${isDarkMode ? 800 : 100}`;
        }

        return (
          // TODO: Use 'isReadOnly' prop instead of 'isDisabled'
          // See: https://github.com/chakra-ui/chakra-ui/issues/52
          <Checkbox
            key={option.id}
            value={`${option.id}`}
            isDisabled={showSolution}
            isFullWidth
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
