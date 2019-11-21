import { css } from '@emotion/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
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

const getQuiz = gql`
  query GetQuiz($id: ID!) {
    quizzes(id: $id) {
      title
      items {
        id
        type
        stem

        t_MultipleOptions {
          constraints_minCount
          constraints_maxCount
          options {
            id
            text
            isSolution
          }
        }

        t_Numeric {
          constraints_minValue
          constraints_maxValue
          precision
          stepSize
          solution
        }
      }
    }
  }
`;

interface QuizPageProps extends RouteComponentProps {
  id?: string;
}

export default function QuizPage({ id: quizID }: QuizPageProps) {
  console.log({ quizID });
  const { items } = multipleChoiceQuizExample;

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
