import { Checkbox, CheckboxGroup, useColorMode } from '@chakra-ui/core';
import React, { useState } from 'react';
import MultipleAnswerQuizItemProps from '../models/MultipleAnswerQuizItemProps';
import Option from '../models/Option';
import { QUIZ_ITEM_CARD_PADDING } from './QuizItemCard';

interface OptionListFormProps extends MultipleAnswerQuizItemProps {
  showSolution?: boolean;
  onChange: (answerIDs: Option['id'][]) => void;
}

export default function OptionListForm({
  choices,
  solutionIDs,
  showSolution,
  onChange,
}: OptionListFormProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const [selectedAnswerIDs, setSelectedAnswerIDs] = useState<Option['id'][]>(
    [],
  );

  return (
    <CheckboxGroup
      value={selectedAnswerIDs}
      onChange={(values: any) => {
        const optionIDs: Option['id'][] = values.map(Number);
        setSelectedAnswerIDs(optionIDs);
        onChange(optionIDs);
      }}
      spacing={0}
    >
      {choices.map(choice => {
        let color;
        // TODO: solutionIDs?.includes(choice.id)
        if (showSolution && solutionIDs && solutionIDs.includes(choice.id)) {
          color = 'green';
        } else if (selectedAnswerIDs.includes(choice.id)) {
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
            value={choice.id}
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
