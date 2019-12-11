import { Flex, Heading, Icon, IconButton, Text } from '@chakra-ui/core';
import React from 'react';

import Card, { CardProps } from './Card';
import Link from './Link';
import QuizDeleteButton from './QuizDeleteButton';
import { GetQuizzesQuery } from './QuizList.generated';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QuizListItemProps extends CardProps {
  quiz: GetQuizzesQuery['quizzes'][0];
  isDisabled?: boolean;
  onRemoving: () => void;
  onRemoved: () => void;
}

export default function QuizListItem({
  quiz,
  isDisabled,
  onRemoving,
  onRemoved,
  ...restProps
}: QuizListItemProps) {
  return (
    <Card boxShadow="sm" p={4} {...restProps}>
      <div inert={isDisabled ? '' : undefined}>
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
            as={Link}
            // TODO: Revisit this once Chakra's TypeScript rewrite is done
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            href={`/app/quiz/${quiz.id}/edit`}
            aria-label="Edit quiz"
            icon={'pen' as any}
            variant="ghost"
            color="gray.500"
            size="xs"
          />
          <QuizDeleteButton
            aria-label="Delete quiz"
            quiz={quiz}
            onRemoving={onRemoving}
            onRemoved={onRemoved}
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
      </div>
    </Card>
  );
}
