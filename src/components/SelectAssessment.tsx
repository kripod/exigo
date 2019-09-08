import { Button, Radio, RadioGroup } from '@chakra-ui/core';
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
              color = 'green';
            } else if (choice === selectedChoice) {
              color = 'red';
            }
          }

          return (
            <Button
              as={Radio}
              key={choice}
              value={choice}
              variantColor={color}
              variant={color ? 'solid' : 'outline'}
              borderWidth={2}
              size="lg"
              isDisabled={selectedChoice != null}
              isFullWidth
            >
              {choice}
            </Button>
          );
        })}
      </RadioGroup>
    </>
  );
}
