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
              px={5}
              py={3}
              color={color}
              bg={bgColor}
            >
              {choice.label}
            </Radio>
          );
        })}
      </RadioGroup>
    </>
  );
}
