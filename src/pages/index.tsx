import React from 'react';
import Layout from '../components/Layout';
import Link from '../components/Link';

export default function IndexPage() {
  return (
    <Layout>
      <Link href="/carousel-demo">Carousel demo</Link>
      <Link href="/quiz">Quiz</Link>
    </Layout>
  );
}
