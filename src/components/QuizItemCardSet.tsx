import { BoxProps } from '@chakra-ui/core';
import React, { useState } from 'react';
import QuizItemCard from './QuizItemCard';
import MultipleChoiceForm from './MultipleChoiceForm';
import QuizItem from '../models/QuizItem';
import QuizItemType from '../models/QuizItemType';

const formComponents = new Map([
  [QuizItemType.MULTIPLE_CHOICE, MultipleChoiceForm],
]);

interface QuizItemCardSetProps extends BoxProps {
  items: QuizItem[];
}

export default function QuizItemCardSet({
  items,
  ...restProps
}: QuizItemCardSetProps) {
  const [index, setIndex] = useState(0);
  const [solutions, setSolutions] = useState<{ [index: number]: unknown }>({});

  const item = items[index];
  const solution = solutions[index];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const Form = formComponents.get(item.type)!;

  return (
    <QuizItemCard stem={item.stem} {...restProps}>
      <Form
        {...item}
        solutionID={solution}
        onChange={() => {
          /* TODO: Get solutionID from server instead of simulated delay */
          if (solution == null) {
            setTimeout(
              () =>
                setSolutions(prevSolutions => ({
                  ...prevSolutions,
                  [index]: item.solutionID,
                })),
              800,
            );
          }
        }}
      />
    </QuizItemCard>
  );
}
