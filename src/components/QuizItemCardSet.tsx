import React, { useState } from 'react';
import QuizItem from '../models/QuizItem';
import QuizItemType from '../models/QuizItemType';
import CarouselRotator, { CarouselRotatorProps } from './CarouselRotator';
import CarouselSlide from './CarouselSlide';
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
  const [itemIndex, setItemIndex] = useState(0);
  const [responses, setResponses] = useState<{ [index: number]: unknown }>({});

  return (
    <CarouselRotator
      as={Measure}
      slideIndex={itemIndex}
      spacingX={4}
      spacingY={6}
      {...restProps}
    >
      {items.map((item, i) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const Evaluator = evaluatorComponents.get(item.type)!;

        return (
          <CarouselSlide>
            <QuizItemCard stem={item.stem}>
              <Evaluator
                {...item}
                onChange={response => {
                  setResponses(prevResponses => ({
                    ...prevResponses,
                    [itemIndex]: response,
                  }));
                }}
              />
            </QuizItemCard>
          </CarouselSlide>
        );
      })}
    </CarouselRotator>
  );
}
