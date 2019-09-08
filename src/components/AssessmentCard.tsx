import { Heading } from '@chakra-ui/core';
import React from 'react';

export const ASSESSMENT_CARD_PADDING = 5;

interface AssessmentCardProps {
  question: string;
  children: React.ReactNode;
}

export default function AssessmentCard({
  question,
  children,
}: AssessmentCardProps) {
  return (
    <>
      <Heading as="h3" size="md" fontWeight={500} m={ASSESSMENT_CARD_PADDING}>
        {question}
      </Heading>

      {children}
    </>
  );
}
