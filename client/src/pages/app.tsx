// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router';
import React from 'react';

import QuizPage from '../pages-dynamic/quiz';

export default function AppPage() {
  return (
    <Router>
      <QuizPage path="/app/quiz/:id" />
    </Router>
  );
}
