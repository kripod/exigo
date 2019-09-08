import React from 'react';
import Layout from '../components/Layout';
import SelectAssessment from '../components/SelectAssessment';

export default function IndexPage() {
  return (
    <Layout>
      <SelectAssessment
        question="If a=1 and b=2, what is a+b?"
        choices={[
          { id: '1', label: '1' },
          { id: '2', label: '3' },
          { id: '3', label: '8' },
          { id: '4', label: '12' },
        ]}
        solutionID="2"
        onChange={() => {
          /* TODO: Get solutionID from server */
        }}
      />
    </Layout>
  );
}
