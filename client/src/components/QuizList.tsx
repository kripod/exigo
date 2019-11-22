import { List, ListItem, Text } from '@chakra-ui/core';
import React from 'react';

import Link from './Link';
import { useGetQuizzesQuery } from './QuizList.generated';

export default function QuizList() {
  const [res] = useGetQuizzesQuery();

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
        <ListItem key={quiz.id}>
          <Link href={`/app/quiz/${quiz.id}`}>{quiz.title}</Link>
        </ListItem>
      ))}
    </List>
  );
}
