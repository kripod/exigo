import { Flex, Heading } from '@chakra-ui/core';
import React from 'react';

import Container from '../components/Container';
import Layout from '../components/Layout';
import QuizCreateButton from '../components/QuizCreateButton';
import QuizList from '../components/QuizList';

export default function IndexPage() {
  return (
    <Layout>
      <Container>
        <Flex justify="space-between">
          <Heading as="h2" fontWeight={600} mb={2}>
            Quizzes
          </Heading>
          <QuizCreateButton>New…</QuizCreateButton>
        </Flex>

        <QuizList />
      </Container>
    </Layout>
  );
}
