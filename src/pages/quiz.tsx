import { css } from '@emotion/core';
import React, { useState } from 'react';

import CarouselContainer from '../components/CarouselContainer';
import CarouselProvider from '../components/CarouselProvider';
import CarouselRotator from '../components/CarouselRotator';
import Layout from '../components/Layout';
import Measure from '../components/Measure';
import MultipleOptionsEvaluator from '../components/MultipleOptionsEvaluator';
import QuizActions from '../components/QuizActions';
import QuizItemCard from '../components/QuizItemCard';
// TODO: Load this from GraphQL template query
import multipleChoiceQuizExample from '../data/examples/multipleChoiceQuiz.json';
import QuizItem from '../models/QuizItem';
import QuizItemType from '../models/QuizItemType';
import QuizResponses from '../models/QuizResponses';

const evaluatorComponents = new Map([
  [QuizItemType.MULTIPLE_OPTIONS, MultipleOptionsEvaluator],
]);

interface QuizPageProps {
  items: QuizItem[];
}

export default function QuizPage({
  items = multipleChoiceQuizExample.items,
}: QuizPageProps) {
  const [remainingItems, setRemainingItems] = useState(items);
  const [responses, setResponses] = useState<QuizResponses>({});

  const [surrenderedItem, setSurrenderedItem] = useState<QuizItem>();

  return (
    <Layout>
      <Measure mx="auto">
        <CarouselProvider>
          <CarouselContainer mt={-6}>
            <CarouselRotator
              ignoreTargetChange={surrenderedItem != null}
              onScrollEnd={() => {
                if (surrenderedItem != null) {
                  setSurrenderedItem(undefined);
                  setRemainingItems(prevRemainingItems => {
                    const index = prevRemainingItems.indexOf(surrenderedItem);
                    return [
                      ...prevRemainingItems.slice(0, index),
                      ...prevRemainingItems.slice(index + 1),
                    ];
                  });
                }
              }}
              // TODO: Use `sx` prop when Chakra switches to Theme UI
              css={theme => css`
                > * {
                  padding: ${theme.space[6]} ${theme.space[4]};
                }
              `}
            >
              {remainingItems.map(item => {
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

          <QuizActions
            remainingItems={remainingItems}
            responses={responses}
            isSurrendering={surrenderedItem != null}
            mt={2}
            px={4}
            onSurrender={setSurrenderedItem}
          />
        </CarouselProvider>
      </Measure>
    </Layout>
  );
}
