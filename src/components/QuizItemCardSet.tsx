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
    <CarouselContainer infinite autoPlay>
      <CarouselRotator as={Measure} spacingX={4} spacingY={6} {...restProps}>
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
    </CarouselContainer>
  );
}
