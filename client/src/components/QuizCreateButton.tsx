import {
  Button,
  ButtonProps,
  FormControl,
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
import React, { useRef } from 'react';

import Scale from './Scale';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QuizCreateButtonProps extends ButtonProps {}

export default function QuizCreateButton(props: QuizCreateButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);

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

              <ModalBody>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input ref={initialRef} placeholder="e.g. Science Quiz" />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button variantColor="green">Create</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Scale>
    </>
  );
}
