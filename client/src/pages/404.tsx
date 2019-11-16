import { Heading, Text } from '@chakra-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '../components/Container';
import Layout from '../components/Layout';

export default function NotFoundPage() {
  return (
    <Layout>
      <Helmet>
        <title>Page not found</title>
      </Helmet>

      <Container>
        <Heading as="h1" fontWeight={600} mb={2}>
          Page not found
        </Heading>
        <Text>The requested page is unavailable.</Text>
      </Container>
    </Layout>
  );
}
