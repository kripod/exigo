import { Heading } from '@chakra-ui/core';
import React from 'react';

export const ASSESSMENT_CARD_PADDING = 5;

interface AssessmentCardProps {
  title: string;
  children: React.ReactNode;
}

export default function AssessmentCard({
  title,
  children,
}: AssessmentCardProps) {
  return (
    <>
      <Heading as="h3" size="md" fontWeight={500} m={ASSESSMENT_CARD_PADDING}>
        {title}
      </Heading>

      {children}
    </>
  );
}
