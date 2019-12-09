import { Box, Flex, Heading, Icon, IconButton, Text } from '@chakra-ui/core';
import React from 'react';

import Card from './Card';
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
    <Flex flexWrap="wrap" mx={-2}>
      {res.data.quizzes.map(quiz => (
        <Box
          key={quiz.id}
          flexGrow={0}
          flexBasis={['100%', null, `${100 / 2}%`, `${100 / 3}%`]}
        >
          <Card boxShadow="sm" m={2} p={4}>
            <Flex>
              <Heading
                as="h3"
                flex={1}
                fontSize="lg"
                fontWeight={600}
                mr={3}
                mb={2}
              >
                <Link href={`/app/quiz/${quiz.id}`} color="blue.400">
                  {quiz.title}
                </Link>
              </Heading>

              <IconButton
                aria-label="Edit quiz"
                icon={'pen' as any}
                variant="ghost"
                color="gray.500"
                size="xs"
              />
              <IconButton
                aria-label="Delete quiz"
                icon={'trash' as any}
                variant="ghost"
                color="gray.500"
                size="xs"
                mr={-1}
              />
            </Flex>

            <Text color="gray.500">
              <Icon
                name={'user' as any}
                aria-label="Author"
                size="0.8em"
                verticalAlign="baseline"
                mr={2}
              />
              {quiz.author.name}
            </Text>
          </Card>
        </Box>
      ))}
    </Flex>
  );
}
