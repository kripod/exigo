import React, { useState } from 'react';
import QuizItem from '../models/QuizItem';
import QuizItemType from '../models/QuizItemType';
import Carousel, { CarouselProps } from './Carousel';
import CarouselSlide from './CarouselSlide';
import Measure from './Measure';
import MultipleOptionsEvaluator from './MultipleOptionsEvaluator';
import QuizItemCard from './QuizItemCard';

// TODO: Follow the status of https://github.com/WICG/inert and remove polyfill
import 'wicg-inert';

const evaluatorComponents = new Map([
  [QuizItemType.MULTIPLE_OPTIONS, MultipleOptionsEvaluator],
]);

interface QuizItemCardSetProps extends Omit<CarouselProps, 'children'> {
  items: QuizItem[];
}

export default function QuizItemCardSet({
  items,
  ...restProps
}: QuizItemCardSetProps) {
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState<{ [index: number]: unknown }>({});

  return (
    <Carousel as={Measure} spacingX={4} spacingY={6} {...restProps}>
      {items.map((item, i) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const Evaluator = evaluatorComponents.get(item.type)!;

        return (
          // TODO: Auto-manage `inert` prop through `Carousel`
          // TODO: Remove extra `div` once `shouldForwardProp` of `Box` supports `inert`
          <CarouselSlide>
            <div inert={i !== index ? '' : undefined}>
              <QuizItemCard stem={item.stem}>
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
            </div>
          </CarouselSlide>
        );
      })}
    </Carousel>
  );
}
