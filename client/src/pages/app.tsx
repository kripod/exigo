// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router';
import React from 'react';

import QuizPage from '../pages-dynamic/quiz';
import NotFoundPage from './404';

export default function AppPage() {
  return (
    <Router basepath="/app">
      <QuizPage path="/quiz/:id" />
      <NotFoundPage default />
    </Router>
  );
}
