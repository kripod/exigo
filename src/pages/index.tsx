import { List, ListItem } from '@chakra-ui/core';
import React from 'react';

import Container from '../components/Container';
import Layout from '../components/Layout';
import Link from '../components/Link';

export default function IndexPage() {
  return (
    <Layout>
      <Container>
        <List styleType="disc">
          <ListItem>
            <Link href="/quiz">Quiz</Link>
          </ListItem>
          <ListItem>
            <Link href="/carousel-demo">Carousel demo</Link>
          </ListItem>
        </List>
      </Container>
    </Layout>
  );
}
