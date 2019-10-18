import React, { useState } from 'react';
import QuizItemCard from '../components/QuizItemCard';
import Layout from '../components/Layout';
import MultipleChoiceForm from '../components/MultipleChoiceForm';
import Option from '../models/Option';

import multipleChoiceQuizExample from '../data/examples/multipleChoiceQuiz.json';

export default function IndexPage() {
  const [solutionID, setSolutionID] = useState<Option['id']>();
  const item = multipleChoiceQuizExample.items[0];

  return (
    <Layout>
      <QuizItemCard stem={item.stem} mx="auto">
        <MultipleChoiceForm
          choices={item.choices}
          solutionID={solutionID}
          onChange={() => {
            /* TODO: Get solutionID from server instead of simulated delay */
            if (!solutionID) {
              setTimeout(() => setSolutionID(item.solutionID), 800);
            }
          }}
        />
      </QuizItemCard>
    </Layout>
  );
}
