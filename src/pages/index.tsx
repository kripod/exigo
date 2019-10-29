import { List, ListItem } from '@chakra-ui/core';
import React from 'react';
import Layout from '../components/Layout';
import Link from '../components/Link';

export default function IndexPage() {
  return (
    <Layout>
      <List styleType="disc">
        <ListItem>
          <Link href="/carousel-demo">Carousel demo</Link>
        </ListItem>
        <ListItem>
          <Link href="/quiz">Quiz</Link>
        </ListItem>
      </List>
    </Layout>
  );
}
