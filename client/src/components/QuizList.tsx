import { Box, Flex, Text, useToast } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';

import { GetQuizzesQuery, useGetQuizzesQuery } from './QuizList.generated';
import QuizListItem from './QuizListItem';

export default function QuizList() {
  const toast = useToast();

  const [quizzes, setQuizzes] = useState<GetQuizzesQuery['quizzes']>([]);
  const [res] = useGetQuizzesQuery();

  useEffect(() => {
    setQuizzes(res.data?.quizzes || []);
  }, [res.data]);

  if (res.fetching) return <Text>Loading…</Text>;
  if (res.error) return <Text>Failed to load.</Text>;

  if (!quizzes.length) {
    return (
      <Text>You currently have no quizzes. Create your first one now!</Text>
    );
  }

  // TODO: Show cards with creation/modification date and author
  return (
    <Flex flexWrap="wrap" mx={-2}>
      {quizzes.map(quiz => (
        <Box
          key={quiz.id}
          flexGrow={0}
          flexBasis={['100%', null, `${100 / 2}%`, `${100 / 3}%`]}
        >
          <QuizListItem
            quiz={quiz}
            m={2}
            onRemoving={() => {
              setQuizzes(prevQuizzes =>
                prevQuizzes.filter(({ id }) => id !== quiz.id),
              );
            }}
            onRemoved={() => {
              toast({
                title: 'Quiz deleted.',
                description: `"${quiz.title}" has been deleted successfully.`,
                status: 'info',
                isClosable: true,
              });
            }}
          />
        </Box>
      ))}
    </Flex>
  );
}
