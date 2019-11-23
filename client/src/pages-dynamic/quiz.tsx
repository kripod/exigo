// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React from 'react';

import Container from '../components/Container';
import Layout from '../components/Layout';
import Quiz from '../components/Quiz';

interface QuizPageProps extends RouteComponentProps {
  id?: string;
}

export default function QuizPage({ id }: QuizPageProps) {
  return (
    <Layout maxHeight="100vh">
      <Container>
        <Quiz id={id || ''} />
      </Container>
    </Layout>
  );
}
