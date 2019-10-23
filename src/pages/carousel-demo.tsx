import { Image } from '@chakra-ui/core';
import React from 'react';
import Carousel from '../components/Carousel';
import Layout from '../components/Layout';

export default function CarouselDemoPage() {
  return (
    <Layout>
      <Carousel isInfinite autoPlay maxWidth="xl" mx="auto">
        <Image
          alt="Aerial photography of lake viewing mountain under orange skies"
          src="https://images.unsplash.com/photo-1569302911021-297d2362e3d3?w=800&q=80"
        />
        <Image
          alt="Empty road near mountain"
          src="https://images.unsplash.com/photo-1569250814530-1e923fd61bc6?w=800&q=80"
        />
        <Image
          alt="Person standing near waterfalls"
          src="https://images.unsplash.com/photo-1569099377939-569bbac3c4df?w=800&q=80"
        />
      </Carousel>
    </Layout>
  );
}
