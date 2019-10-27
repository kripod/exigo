import { css } from '@emotion/core';
import React, { useState } from 'react';
import CarouselContainer from '../components/CarouselContainer';
import CarouselRotator, {
  CarouselRotatorProps,
} from '../components/CarouselRotator';
import Layout from '../components/Layout';
import Measure from '../components/Measure';
import MultipleOptionsEvaluator from '../components/MultipleOptionsEvaluator';
import QuizItemCard from '../components/QuizItemCard';
import QuizItem from '../models/QuizItem';
import QuizItemType from '../models/QuizItemType';

// TODO: Load this from GraphQL template query
import multipleChoiceQuizExample from '../data/examples/multipleChoiceQuiz.json';

const evaluatorComponents = new Map([
  [QuizItemType.MULTIPLE_OPTIONS, MultipleOptionsEvaluator],
]);

interface QuizPageProps extends Omit<CarouselRotatorProps, 'children'> {
  items: QuizItem[];
}

export default function QuizPage({
  items = multipleChoiceQuizExample.items,
  ...restProps
}: QuizPageProps) {
  const [responses, setResponses] = useState<{ [id: number]: unknown }>({});

  return (
    <Layout>
      <Measure mx="auto">
        <CarouselContainer {...restProps} my={-6}>
          <CarouselRotator
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
        </CarouselContainer>
      </Measure>
    </Layout>
  );
}
