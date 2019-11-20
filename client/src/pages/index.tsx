import { Heading } from '@chakra-ui/core';
import React from 'react';

import Container from '../components/Container';
import Layout from '../components/Layout';
import QuizList from '../components/QuizList';

export default function IndexPage() {
  return (
    <Layout>
      <Container>
        <Heading as="h2" textTransform="capitalize" fontWeight={600} mb={2}>
          Your quizzes
        </Heading>
        <QuizList />
      </Container>
    </Layout>
  );
}
