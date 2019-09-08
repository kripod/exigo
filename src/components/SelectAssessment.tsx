import { Radio, RadioGroup } from '@chakra-ui/core';
import React, { useState } from 'react';
import SelectChoice from '../models/SelectChoice';

type SelectAssessmentProps = {
  question: string;
  choices: SelectChoice[];
  solutionID?: SelectChoice['id'];
  onChange: (choiceID: SelectChoice['id']) => void;
};

export default function SelectAssessment({
  question,
  choices,
  solutionID,
  onChange,
}: SelectAssessmentProps) {
  const [selectedChoiceID, setSelectedChoiceID] = useState<
    SelectChoice['id']
  >();

  return (
    <>
      <p>{question}</p>

      <RadioGroup
        value={selectedChoiceID}
        onChange={(event: any) => {
          const choiceID = event.target.value;
          setSelectedChoiceID(choiceID);
          onChange(choiceID);
        }}
      >
        {choices.map(choice => {
          let color;
          if (solutionID && selectedChoiceID) {
            if (choice.id === solutionID) {
              color = 'green.200';
            } else if (choice.id === selectedChoiceID) {
              color = 'red.200';
            }
          } else if (choice.id === selectedChoiceID) {
            color = 'blue.200';
          }

          return (
            <Radio
              key={choice.id}
              value={choice.id}
              isFullWidth
              px={3}
              py={2}
              bg={color}
              borderWidth={1}
            >
              {choice.label}
            </Radio>
          );
        })}
      </RadioGroup>
    </>
  );
}
