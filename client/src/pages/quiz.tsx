import { css } from '@emotion/core';
import React, { useState } from 'react';

import CarouselContainer from '../components/CarouselContainer';
import CarouselProvider from '../components/CarouselProvider';
import CarouselRotator from '../components/CarouselRotator';
import Layout from '../components/Layout';
import Measure from '../components/Measure';
import QuizEvaluatorActions from '../components/QuizEvaluatorActions';
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

  const [itemBeingRemoved, setItemBeingRemoved] = useState<QuizItem>();

  return (
    <Layout maxHeight="100vh">
      <Measure mx="auto">
        <CarouselProvider>
          <CarouselContainer mt={-6}>
            <CarouselRotator
              ignoreTargetChange={itemBeingRemoved != null}
              maxHeight="fill-available"
              onScrollEnd={() => {
                if (itemBeingRemoved != null) {
                  setItemBeingRemoved(undefined);
                  setRemainingItems(prevRemainingItems => {
                    const index = prevRemainingItems.indexOf(itemBeingRemoved);
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
                  <QuizItemCard
                    key={item.id}
                    item={item}
                    shownIndex={items.findIndex(({ id }) => id === item.id)}
                    totalCount={items.length}
                    isEditable
                  >
                    <QuizItemEvaluator
                      item={item}
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

          <QuizEvaluatorActions
            remainingItems={remainingItems}
            responses={responses}
            disableNavigation={itemBeingRemoved != null}
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
                    solution: items.find(({ id }) => id === item.id)?.solution,
                  },
                  ...prevRemainingItems.slice(index + 1),
                ];
              })
            }
            onSurrender={setItemBeingRemoved}
          />
        </CarouselProvider>
      </Measure>
    </Layout>
  );
}
