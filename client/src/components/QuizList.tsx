import { List, ListItem, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'urql';

import { Quiz } from '../models/Quiz';
import Link from './Link';

const getQuizzes = gql`
  {
    quizzes {
      id
      title
    }
  }
`;

export default function QuizList() {
  const [res] = useQuery<{ quizzes: Pick<Quiz, 'id' | 'title'>[] }>({
    query: getQuizzes,
  });

  if (res.fetching) return <Text>Loading…</Text>;
  if (res.error) return <Text>Failed to load.</Text>;

  if (!res.data?.quizzes.length) {
    return (
      <Text>You currently have no quizzes. Create your first one now!</Text>
    );
  }

  // TODO: Show cards with creation/modification date and author
  return (
    <List styleType="disc">
      {res.data.quizzes.map(quiz => (
        <ListItem>
          <Link href={`/quiz/${quiz.id}`}>{quiz.title}</Link>
        </ListItem>
      ))}
    </List>
  );
}
