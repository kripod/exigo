import { css } from '@emotion/core';
import React, { useState } from 'react';

import CarouselContainer from '../components/CarouselContainer';
import CarouselProvider from '../components/CarouselProvider';
import CarouselRotator from '../components/CarouselRotator';
import Layout from '../components/Layout';
import Measure from '../components/Measure';
import QuizActions from '../components/QuizActions';
import QuizItemCard from '../components/QuizItemCard';
import QuizItemEvaluator from '../components/QuizItemEvaluator';
// TODO: Load this from GraphQL template query
import multipleChoiceQuizExample from '../data/examples/multipleChoiceQuiz.json';
import QuizAnswers from '../models/QuizAnswers';
import QuizItem from '../models/QuizItem';

interface QuizPageProps {
  items: QuizItem[];
}

export default function QuizPage({
  items = multipleChoiceQuizExample.items,
}: QuizPageProps) {
  const [remainingItems, setRemainingItems] = useState(() =>
    // Simulate that solutions are not given at first
    items.map(({ solution, ...itemProps }) => itemProps),
  );
  const [responses, setResponses] = useState<QuizAnswers>({});

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
                return (
                  <QuizItemCard key={item.id} stem={item.stem}>
                    <QuizItemEvaluator
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
            disableNavigation={surrenderedItem != null}
            mt={2}
            px={4}
            onCheckAnswer={item =>
              setRemainingItems(prevRemainingItems => {
                const index = prevRemainingItems.findIndex(
                  ({ id }) => id === item.id,
                );
                return [
                  ...prevRemainingItems.slice(0, index),
                  {
                    ...item,
                    // TODO: Load solution from the server if desired
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    solution: items.find(({ id }) => id === item.id)!.solution,
                  },
                  ...prevRemainingItems.slice(index + 1),
                ];
              })
            }
            onSurrender={setSurrenderedItem}
          />
        </CarouselProvider>
      </Measure>
    </Layout>
  );
}
