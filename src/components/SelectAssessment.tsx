import { RadioButtonGroup } from '@chakra-ui/core';
import React, { useMemo, useState } from 'react';
import { sort } from '../utils/array';
import RadioButton from './RadioButton';

type SelectAssessmentProps = {
  question: string;
  solution: string;
  distractors: string[];
  sortChoices?: (choices: string[]) => string[];
};

export default function SelectAssessment({
  question,
  solution,
  distractors,
  sortChoices = sort,
}: SelectAssessmentProps) {
  const choices = useMemo(() => sortChoices([...solution, ...distractors]), [
    distractors,
    solution,
    sortChoices,
  ]);

  const [selectedChoice, setSelectedChoice] = useState<string>();

  return (
    <>
      <p>{question}</p>

      <RadioButtonGroup value={selectedChoice} onChange={setSelectedChoice}>
        {choices.map(choice => {
          let color;
          if (selectedChoice != null) {
            if (choice === solution) {
              color = 'green';
            } else if (choice === selectedChoice) {
              color = 'red';
            }
          }

          return (
            <RadioButton
              key={choice}
              value={choice}
              variant={color ? 'solid' : 'outline'}
              variantColor={color}
              isDisabled={selectedChoice != null}
              isFullWidth
            >
              {choice}
            </RadioButton>
          );
        })}
      </RadioButtonGroup>
    </>
  );
}
