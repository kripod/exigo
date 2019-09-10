import { Radio, RadioGroup } from '@chakra-ui/core';
import React, { useState } from 'react';
import SelectChoice from '../models/SelectChoice';
import SelectSingleQuiz from '../models/SelectSingleQuiz';
import { QUIZ_CARD_PADDING } from './QuizCard';

interface SelectSingleQuizEvaluatorProps extends SelectSingleQuiz {
  onChange: (choiceID: SelectChoice['id']) => void;
}

export default function SelectSingleQuizEvaluator({
  choices,
  solutionID,
  onChange,
}: SelectSingleQuizEvaluatorProps) {
  const [selectedChoiceID, setSelectedChoiceID] = useState<
    SelectChoice['id']
  >();

  return (
    <RadioGroup
      value={String(selectedChoiceID)}
      onChange={(event: any) => {
        const choiceID: SelectChoice['id'] = Number(event.target.value);
        setSelectedChoiceID(choiceID);
        onChange(choiceID);
      }}
      spacing={0}
    >
      {choices.map((choice, i) => {
        let color;
        if (choice.id === solutionID) {
          color = 'green';
        } else if (choice.id === selectedChoiceID) {
          color = solutionID ? 'red' : 'blue';
        }

        let bgColor;
        if (color) {
          bgColor = `${color}.200`;
        } else if (i % 2 === 0) {
          bgColor = 'gray.50';
        }

        return (
          // TODO: Use 'isReadOnly' prop instead of 'isDisabled'
          // See: https://github.com/chakra-ui/chakra-ui/issues/52
          <Radio
            key={choice.id}
            value={String(choice.id)}
            isDisabled={Boolean(solutionID && selectedChoiceID)}
            isFullWidth
            px={QUIZ_CARD_PADDING}
            py={3}
            color={color}
            bg={bgColor}
          >
            {choice.label}
          </Radio>
        );
      })}
    </RadioGroup>
  );
}