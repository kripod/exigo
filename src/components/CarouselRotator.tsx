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

export interface CarouselRotatorProps extends FlexProps {
  children: React.ReactComponentElement<typeof CarouselSlide>[];
  infinite?: boolean;
  autoPlay?: boolean;
  playInterval?: number;
  activeIndex?: number;
  spacing?: MarginProps['margin'];
  spacingX?: MarginProps['mx'];
  spacingY?: MarginProps['my'];
}

export default function CarouselRotator({
  children,
  infinite,
  autoPlay,
  playInterval = 5000,
  activeIndex = 0,
  spacing,
  spacingX,
  spacingY,
  ...restProps
}: CarouselRotatorProps) {
  return (
    <Flex
      as="section"
      aria-roledescription="carousel"
      aria-live="polite" // The carousel is NOT automatically rotating
      my={negateResponsiveValue(spacingY != null ? spacingY : spacing)}
      overflow="auto"
      css={{
        scrollSnapType: 'x mandatory',
        // TODO: Leave vendor prefixing to the underlying library
        '::-webkit-scrollbar': { width: 0 },
        '-msOverflowStyle': 'none',
        scrollbarWidth: 'none',
      }}
      {...restProps}
    >
      {React.Children.map(children, (child, i) => (
        <CarouselSlide
          inert={i !== activeIndex ? '' : undefined}
          px={spacingX != null ? spacingX : spacing}
          py={spacingY != null ? spacingY : spacing}
        >
          {child}
        </CarouselSlide>
      ))}
    </Flex>
  );
}
