import { BoxProps } from '@chakra-ui/core';
import React, { useState } from 'react';
import QuizItemCard from './QuizItemCard';
import OptionSetEvaluator from './OptionSetEvaluator';
import QuizItem from '../models/QuizItem';
import QuizItemType from '../models/QuizItemType';

const evaluatorComponents = new Map([
  [QuizItemType.MULTIPLE_CHOICE, OptionSetEvaluator],
]);

interface QuizItemCardSetProps extends BoxProps {
  items: QuizItem[];
}

export default function QuizItemCardSet({
  items,
  ...restProps
}: QuizItemCardSetProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [index: number]: unknown }>({});

  const item = items[index];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const Evaluator = evaluatorComponents.get(item.type)!;

  return (
    <QuizItemCard stem={item.stem} {...restProps}>
      <Evaluator
        {...item}
        onChange={answer => {
          setAnswers(prevAnswers => ({ ...prevAnswers, [index]: answer }));
        }}
      />
    </QuizItemCard>
  );
}
