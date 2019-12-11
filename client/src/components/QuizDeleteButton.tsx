import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  IconButtonProps,
  Text,
  useDisclosure,
} from '@chakra-ui/core';
import React, { useEffect, useRef } from 'react';

import { Quiz } from '../models.generated.d';
import { useDeleteQuizMutation } from './QuizDeleteButton.generated';
import Scale from './Scale';

export interface QuizDeleteButtonProps extends IconButtonProps {
  quiz: Pick<Quiz, 'id' | 'title'>;
  onRemoving: () => void;
  onRemoved: () => void;
}

export default function QuizDeleteButton({
  quiz,
  onRemoving,
  onRemoved,
  ...restProps
}: QuizDeleteButtonProps) {
  const [res, deleteQuiz] = useDeleteQuizMutation();
  useEffect(() => {
    if (res.data?.deleteOneQuiz?.id === quiz.id) {
      onRemoved();
    }
  }, [onRemoved, quiz.id, res.data]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        icon={'trash' as any}
        variant="ghost"
        color="gray.500"
        size="xs"
        mr={-1}
        onClick={onOpen}
        {...restProps}
      />

      <Scale in={isOpen}>
        {styles => (
          <AlertDialog
            leastDestructiveRef={cancelButtonRef}
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
    </>
  );
}
