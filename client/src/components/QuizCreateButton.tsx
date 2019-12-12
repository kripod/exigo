import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/core';
import { navigate } from 'gatsby';
import React, { useEffect, useRef } from 'react';
import useForm from 'react-hook-form';

import { useCreateQuizMutation } from './QuizCreateButton.generated';
import Scale from './Scale';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QuizCreateButtonProps extends ButtonProps {}

export default function QuizCreateButton(props: QuizCreateButtonProps) {
  const [res, createQuiz] = useCreateQuizMutation();
  useEffect(() => {
    const id = res.data?.createOneQuiz?.id;
    if (id) navigate(`/app/quiz/${id}/edit`);
  }, [res.data]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, errors } = useForm();

  return (
    <>
      <Button
        leftIcon={'plus' as any}
        variantColor="green"
        variant="outline"
        onClick={onOpen}
        {...props}
      />

      <Scale in={isOpen}>
        {styles => (
          <Modal initialFocusRef={initialRef} onClose={onClose} isOpen>
            <ModalOverlay opacity={styles.opacity} />
            <ModalContent {...styles}>
              <ModalHeader>Create a new quiz</ModalHeader>
              <ModalCloseButton />

              <form
                onSubmit={handleSubmit(({ title }) => {
                  createQuiz({ title });
                })}
              >
                <ModalBody>
                  <FormControl isInvalid={Boolean(errors.title)}>
                    <FormLabel>Title</FormLabel>
                    <Input
                      ref={(instance: HTMLInputElement) => {
                        (initialRef.current as HTMLInputElement) = instance;
                        register({ required: 'Please fill out this field' })(
                          instance,
                        );
                      }}
                      name="title"
                      placeholder="e.g. Science Quiz"
                    />
                    <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variantColor="green">
                    Create
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        )}
      </Scale>
    </>
  );
}
