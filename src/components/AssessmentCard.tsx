import { Heading } from '@chakra-ui/core';
import React from 'react';

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
      <Heading as="h3" size="md" fontWeight={500} m={5}>
        {question}
      </Heading>

      {children}
    </>
  );
}
