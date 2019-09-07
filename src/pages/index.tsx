import React from 'react';
import Layout from '../components/Layout';
import SelectAssessment from '../components/SelectAssessment';

export default function IndexPage() {
  return (
    <Layout>
      <SelectAssessment
        question="If a=1 and b=2, what is a+b?"
        solution="3"
        distractors={['1', '2', '4']}
      />
    </Layout>
  );
}
