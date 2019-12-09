// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router';
import React from 'react';

import QuizPage from '../pages-dynamic/quiz';
import QuizEditorPage from '../pages-dynamic/quiz/edit';
import NotFoundPage from './404';

export default function AppPage() {
  return (
    <Router basepath="/app">
      <QuizPage path="/quiz/:id" />
      <QuizEditorPage path="/quiz/:id/edit" />
      <NotFoundPage default />
    </Router>
  );
}
