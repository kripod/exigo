import { css } from '@emotion/core';
import React, { useState } from 'react';
import QuizItem from '../models/QuizItem';
import QuizItemType from '../models/QuizItemType';
import CarouselContainer from './CarouselContainer';
import CarouselRotator, { CarouselRotatorProps } from './CarouselRotator';
import Measure from './Measure';
import MultipleOptionsEvaluator from './MultipleOptionsEvaluator';
import QuizItemCard from './QuizItemCard';

const evaluatorComponents = new Map([
  [QuizItemType.MULTIPLE_OPTIONS, MultipleOptionsEvaluator],
]);

interface QuizItemCardSetProps extends Omit<CarouselRotatorProps, 'children'> {
  items: QuizItem[];
}

export default function QuizItemCardSet({
  items,
  ...restProps
}: QuizItemCardSetProps) {
  const [responses, setResponses] = useState<{ [id: number]: unknown }>({});

  return (
    <Measure as={CarouselContainer} {...restProps}>
      <CarouselRotator
        my={-6}
        // TODO: Use `sx` prop when Chakra switches to Theme UI
        css={theme => css`
          > * {
            padding: ${theme.space[6]} ${theme.space[4]};
          }
        `}
      >
        {items.map(item => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const Evaluator = evaluatorComponents.get(item.type)!;

          return (
            <QuizItemCard key={item.id} stem={item.stem}>
              <Evaluator
                {...item}
                onChange={response => {
                  setResponses(prevResponses => ({
                    ...prevResponses,
                    [item.id]: response,
                  }));
                }}
              />
            </QuizItemCard>
          );
        })}
      </CarouselRotator>
    </Measure>
  );
}
