import { BoxProps, Flex } from '@chakra-ui/core';
import React, { useState } from 'react';
import QuizItem from '../models/QuizItem';
import QuizItemType from '../models/QuizItemType';
import Measure from './Measure';
import MultipleOptionsEvaluator from './MultipleOptionsEvaluator';
import QuizItemCard from './QuizItemCard';

const evaluatorComponents = new Map([
  [QuizItemType.MULTIPLE_OPTIONS, MultipleOptionsEvaluator],
]);

interface QuizItemCardSetProps extends BoxProps {
  items: QuizItem[];
}

export default function QuizItemCardSet({
  items,
  ...restProps
}: QuizItemCardSetProps) {
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState<{ [index: number]: unknown }>({});

  return (
    <Flex
      as={Measure}
      overflow="auto"
      css={{ scrollSnapType: 'x mandatory' }}
      {...restProps}
    >
      {items.map(item => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const Evaluator = evaluatorComponents.get(item.type)!;

        return (
          <QuizItemCard
            stem={item.stem}
            flex="0 0 100%"
            css={{ scrollSnapAlign: 'center' }}
          >
            <Evaluator
              {...item}
              onChange={response => {
                setResponses(prevResponses => ({
                  ...prevResponses,
                  [index]: response,
                }));
              }}
            />
          </QuizItemCard>
        );
      })}
    </Flex>
  );
}
