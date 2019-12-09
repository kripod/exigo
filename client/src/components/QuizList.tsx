import { Box, Flex, Text } from '@chakra-ui/core';
import React from 'react';

import { useGetQuizzesQuery } from './QuizList.generated';
import QuizListItem from './QuizListItem';

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
    <Flex flexWrap="wrap" mx={-2}>
      {res.data.quizzes.map(quiz => (
        <Box
          key={quiz.id}
          flexGrow={0}
          flexBasis={['100%', null, `${100 / 2}%`, `${100 / 3}%`]}
        >
          <QuizListItem quiz={quiz} m={2} />
        </Box>
      ))}
    </Flex>
  );
}
