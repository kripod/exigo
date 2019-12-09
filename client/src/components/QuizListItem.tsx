import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/core';
import React, { useEffect, useRef } from 'react';

import Card, { CardProps } from './Card';
import Link from './Link';
import { GetQuizzesQuery } from './QuizList.generated';
import { useDeleteQuizMutation } from './QuizListItem.generated';
import Scale from './Scale';

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
  ...props
}: QuizListItemProps) {
  const [res, deleteQuiz] = useDeleteQuizMutation();
  useEffect(() => {
    if (res.data?.deleteOneQuiz?.id === quiz.id) {
      onRemoved();
    }
  }, [onRemoved, quiz.id, res.data]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initiatorButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Card boxShadow="sm" p={4} {...props}>
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
          <IconButton
            ref={initiatorButtonRef}
            aria-label="Delete quiz"
            icon={'trash' as any}
            variant="ghost"
            color="gray.500"
            size="xs"
            mr={-1}
            onClick={onOpen}
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

      <Scale in={isOpen}>
        {styles => (
          <AlertDialog
            leastDestructiveRef={cancelButtonRef}
            finalFocusRef={initiatorButtonRef}
            onClose={onClose}
            isOpen
          >
            <AlertDialogOverlay opacity={styles.opacity} />
            <AlertDialogContent {...styles}>
              <AlertDialogHeader>Delete quiz?</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                This action cannot be undone. Are you sure about deleting{' '}
                <Text as="q" fontWeight={600}>
                  {quiz.title}
                </Text>{' '}
                permanently?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelButtonRef} mr={3} onClick={onClose}>
                  No, keep it
                </Button>
                <Button
                  variantColor="red"
                  onClick={() => {
                    deleteQuiz({ id: quiz.id });
                    onRemoving();
                    onClose();
                  }}
                >
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </Scale>
    </Card>
  );
}
