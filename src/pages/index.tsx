import React from 'react';
import QuizItemCardSet from '../components/QuizItemCardSet';
import Layout from '../components/Layout';

import multipleChoiceQuizExample from '../data/examples/multipleChoiceQuiz.json';

export default function IndexPage() {
  return (
    <Layout>
      <QuizItemCardSet items={multipleChoiceQuizExample.items} mx="auto" />
    </Layout>
  );
}
