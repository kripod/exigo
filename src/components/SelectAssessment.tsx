import { Heading, Radio, RadioGroup } from '@chakra-ui/core';
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
      <Heading as="h3" size="md" fontWeight={500} m={5}>
        {question}
      </Heading>

      <RadioGroup
        value={selectedChoiceID}
        onChange={(event: any) => {
          const choiceID = event.target.value;
          setSelectedChoiceID(choiceID);
          onChange(choiceID);
        }}
        spacing={0}
      >
        {choices.map((choice, i) => {
          let color = i % 2 === 0 ? 'gray.50' : '';
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
              px={5}
              py={3}
              bg={color}
            >
              {choice.label}
            </Radio>
          );
        })}
      </RadioGroup>
    </>
  );
}
