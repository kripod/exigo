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
  children: React.ReactElement[];
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
      aria-atomic={false}
      aria-live={autoPlay ? 'off' : 'polite'}
      onMouseDown={e => {
        // Disable mouse wheel scrolling between slides
        if (e.button === 1) e.preventDefault();
      }}
      my={negateResponsiveValue(spacingY != null ? spacingY : spacing)}
      overflow="auto"
      css={{
        scrollSnapType: 'x mandatory',
        // TODO: Leave vendor prefixing to the underlying library
        '::-webkit-scrollbar': { width: 0 },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
      {...restProps}
    >
      {React.Children.map(children, (child, i) => (
        // Labels are lifted up to comply with WAI-ARIA Authoring Practices
        <CarouselSlide
          inert={i !== activeIndex ? '' : undefined}
          aria-label={child.props['aria-label']}
          aria-labelledby={child.props['aria-labelledby']}
          px={spacingX != null ? spacingX : spacing}
          py={spacingY != null ? spacingY : spacing}
        >
          {React.cloneElement(child, {
            'aria-label': undefined,
            'aria-labelledby': undefined,
          })}
        </CarouselSlide>
      ))}
    </Flex>
  );
}
