import { Checkbox, CheckboxGroup, useColorMode } from '@chakra-ui/core';
import React, { useState } from 'react';
import MultipleAnswerQuizItemProps from '../models/MultipleAnswerQuizItemProps';
import Option from '../models/Option';
import { QUIZ_ITEM_CARD_PADDING } from './QuizItemCard';

interface OptionSetEvaluatorProps extends MultipleAnswerQuizItemProps {
  showSolution?: boolean;
  onChange: (response: Option['id'][]) => void;
}

export default function OptionSetEvaluator({
  choices,
  solutionIDs,
  showSolution,
  onChange,
}: OptionSetEvaluatorProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const [response, setResponse] = useState<Option['id'][]>([]);

  return (
    <CheckboxGroup
      // TODO: value={response}
      onChange={(values: any) => {
        const optionIDs: Option['id'][] = values.map(Number);
        setResponse(optionIDs);
        onChange(optionIDs);
      }}
      spacing={0}
    >
      {choices.map(choice => {
        let color;
        // TODO: solutionIDs?.includes(choice.id)
        if (showSolution && solutionIDs && solutionIDs.includes(choice.id)) {
          color = 'green';
        } else if (response.includes(choice.id)) {
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
            key={choice.id}
            value={`${choice.id}`}
            isDisabled={showSolution}
            isFullWidth
            px={QUIZ_ITEM_CARD_PADDING}
            py={3}
            color={color}
            bg={bgColor}
          >
            {choice.text}
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
}
