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
        onChange={(e: any) => setSelectedChoice(e.target.value)}
      >
        {choices.map(choice => {
          let bgColor;
          if (selectedChoice != null) {
            if (choice === solution) {
              bgColor = 'green.400';
            } else if (choice === selectedChoice) {
              bgColor = 'red.400';
            }
          }

          return (
            <Radio
              key={choice}
              value={choice}
              isDisabled={selectedChoice != null}
              bg={bgColor}
            >
              {choice}
            </Radio>
          );
        })}
      </RadioGroup>
    </>
  );
}
