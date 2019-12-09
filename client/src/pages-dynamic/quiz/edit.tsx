// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React from 'react';

import Container from '../../components/Container';
import Layout from '../../components/Layout';
import Quiz from '../../components/Quiz';

interface QuizEditorPageProps extends RouteComponentProps {
  id?: string;
}

export default function QuizPage({ id }: QuizEditorPageProps) {
  return (
    <Layout maxHeight="100vh">
      <Container>
        <Quiz id={id || ''} isEditable />
      </Container>
    </Layout>
  );
}
