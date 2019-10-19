import { Radio, RadioGroup, useColorMode } from '@chakra-ui/core';
import React, { useState } from 'react';
import MultipleChoiceQuizItemProps from '../models/MultipleChoiceQuizItemProps';
import Option from '../models/Option';
import { QUIZ_ITEM_CARD_PADDING } from './QuizItemCard';

interface MultipleAnswerFormProps extends MultipleChoiceQuizItemProps {
  showSolution?: boolean;
  onChange: (choiceID: Option['id']) => void;
}

export default function MultipleAnswerForm({
  choices,
  solutionID,
  showSolution,
  onChange,
}: MultipleAnswerFormProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const [selectedChoiceID, setSelectedChoiceID] = useState<Option['id']>(0);

  return (
    <RadioGroup
      value={selectedChoiceID}
      onChange={(event: any) => {
        const choiceID: Option['id'] = Number(event.target.value);
        setSelectedChoiceID(choiceID);
        onChange(choiceID);
      }}
      spacing={0}
    >
      {choices.map(choice => {
        let color;
        if (showSolution && choice.id === solutionID) {
          color = 'green';
        } else if (choice.id === selectedChoiceID) {
          color = showSolution ? 'red' : 'blue';
        }

        let bgColor;
        if (color) {
          bgColor = `${color}.${isDarkMode ? 800 : 100}`;
        }

        return (
          // TODO: Use 'isReadOnly' prop instead of 'isDisabled'
          // See: https://github.com/chakra-ui/chakra-ui/issues/52
          <Radio
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
          </Radio>
        );
      })}
    </RadioGroup>
  );
}
