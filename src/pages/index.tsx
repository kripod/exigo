import React, { useState } from 'react';
import QuizItemCard from '../components/QuizItemCard';
import Layout from '../components/Layout';
import MultipleChoiceForm from '../components/MultipleChoiceForm';
import Option from '../models/Option';

export default function IndexPage() {
  const [solutionID, setSolutionID] = useState<Option['id']>();

  return (
    <Layout>
      <QuizItemCard stem="If a=1 and b=2, what is a+b?" mx="auto">
        <MultipleChoiceForm
          choices={[
            { id: 1, text: '1' },
            { id: 2, text: '3' },
            { id: 3, text: '8' },
            { id: 4, text: '12' },
          ]}
          solutionID={solutionID}
          onChange={() => {
            /* TODO: Get solutionID from server instead of simulated delay */
            if (!solutionID) setTimeout(() => setSolutionID(2), 800);
          }}
        />
      </QuizItemCard>
    </Layout>
  );
}
