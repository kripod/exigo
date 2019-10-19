import { BoxProps } from '@chakra-ui/core';
import React, { useState } from 'react';
import QuizItemCard from './QuizItemCard';
import OptionListForm from './OptionListForm';
import QuizItem from '../models/QuizItem';
import QuizItemType from '../models/QuizItemType';

const formComponents = new Map([
  [QuizItemType.MULTIPLE_CHOICE, OptionListForm],
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
  const Form = formComponents.get(item.type)!;

  return (
    <QuizItemCard stem={item.stem} {...restProps}>
      <Form
        {...item}
        onChange={answer => {
          setAnswers(prevAnswers => ({ ...prevAnswers, [index]: answer }));
        }}
      />
    </QuizItemCard>
  );
}
