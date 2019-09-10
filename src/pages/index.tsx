import React, { useState } from 'react';
import QuizItemCard from '../components/QuizItemCard';
import Layout from '../components/Layout';
import SelectSingleItemForm from '../components/SelectSingleItemForm';
import SelectChoice from '../models/SelectChoice';

export default function IndexPage() {
  const [solutionID, setSolutionID] = useState<SelectChoice['id']>();

  return (
    <Layout>
      <QuizItemCard stem="If a=1 and b=2, what is a+b?">
        <SelectSingleItemForm
          choices={[
            { id: 1, label: '1' },
            { id: 2, label: '3' },
            { id: 3, label: '8' },
            { id: 4, label: '12' },
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
