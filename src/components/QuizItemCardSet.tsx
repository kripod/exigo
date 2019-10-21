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
  const [itemIndex, setItemIndex] = useState(0);
  const [responses, setResponses] = useState<{ [index: number]: unknown }>({});

  return (
    <CarouselContainer>
      <CarouselRotator
        as={Measure}
        activeIndex={itemIndex}
        spacingX={4}
        spacingY={6}
        {...restProps}
      >
        {items.map((item, i) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const Evaluator = evaluatorComponents.get(item.type)!;

          return (
            // eslint-disable-next-line react/no-array-index-key
            <QuizItemCard key={i} stem={item.stem}>
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
          );
        })}
      </CarouselRotator>
    </CarouselContainer>
  );
}
