import { Radio, RadioGroup } from '@chakra-ui/core';
import React, { useMemo, useState } from 'react';
import { sort } from '../utils/array';

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

      <RadioGroup
        value={selectedChoice}
        onChange={e => setSelectedChoice(e.target.value)}
      >
        {choices.map(choice => {
          let color;
          if (selectedChoice != null) {
            if (choice === solution) {
              color = 'green.200';
            } else if (choice === selectedChoice) {
              color = 'red.200';
            }
          }

          return (
            <Radio
              key={choice}
              value={choice}
              isDisabled={selectedChoice != null}
              isFullWidth
              px={3}
              py={2}
              bg={color}
              borderWidth={1}
            >
              {choice}
            </Radio>
          );
        })}
      </RadioGroup>
    </>
  );
}
