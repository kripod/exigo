import { Flex, FlexProps } from '@chakra-ui/core';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MarginProps, ResponsiveValue } from 'styled-system';
import { fromEntries } from '../utils/object';
import CarouselSlide from './CarouselSlide';

// TODO: https://www.w3.org/TR/wai-aria-practices-1.1/#grouped-carousel-elements

function negateResponsiveValue<T>(value: ResponsiveValue<T>) {
  if (value == null) return value;
  if (typeof value === 'number') return -value;
  if (typeof value === 'string') return `-${value}`;
  if (Array.isArray(value)) return value.map(v => (v != null ? `${-v}` : v));
  return fromEntries(
    Object.entries(value).map(([k, v]) => [k, v != null ? `${-v}` : v]),
  );
}

export interface CarouselProps extends FlexProps {
  children: React.ReactComponentElement<typeof CarouselSlide>[];
  slideIndex?: number;
  spacing?: MarginProps['margin'];
  spacingX?: MarginProps['mx'];
  spacingY?: MarginProps['my'];
}

export default function Carousel({
  children,
  slideIndex = 0,
  spacing,
  spacingX,
  spacingY,
  ...restProps
}: CarouselProps) {
  return (
    <Flex
      as="section"
      aria-roledescription="carousel"
      aria-live="polite" // The carousel is NOT automatically rotating
      my={negateResponsiveValue(spacingY != null ? spacingY : spacing)}
      overflow="auto"
      css={{
        scrollSnapType: 'x mandatory',
        '::-webkit-scrollbar': { width: 0 },
        '-msOverflowStyle': 'none',
        scrollbarWidth: 'none',
      }}
      {...restProps}
    >
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          inert: i !== slideIndex ? '' : undefined,
          px: spacingX != null ? spacingX : spacing,
          py: spacingY != null ? spacingY : spacing,
        }),
      )}
    </Flex>
  );
}
