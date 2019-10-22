import { Flex, FlexProps } from '@chakra-ui/core';
import React, { useContext, useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MarginProps, ResponsiveValue } from 'styled-system';
import { useInterval } from 'web-api-hooks';
import useCarouselControls from '../hooks/useCarouselControls';
import { fromEntries } from '../utils/object';
import CarouselContext from './CarouselContext';
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
  playInterval?: number;
  activeIndex?: number;
  spacing?: MarginProps['margin'];
  spacingX?: MarginProps['mx'];
  spacingY?: MarginProps['my'];
}

export default function CarouselRotator({
  children,
  playInterval = 5000,
  activeIndex: controlledActiveIndex,
  spacing,
  spacingX,
  spacingY,
  ...restProps
}: CarouselRotatorProps) {
  const {
    isPlaying,
    activeIndex: uncontrolledActiveIndex,
    jump,
    jumpTo,
  } = useCarouselControls();
  const activeIndex =
    controlledActiveIndex != null
      ? controlledActiveIndex
      : uncontrolledActiveIndex;

  // Auto-rotate slides if desired
  useInterval(
    () => {
      jump(+1);
    },
    isPlaying ? playInterval : null,
  );

  // Track user-initiated scrolling
  const rotatorRef = useRef<HTMLElement>();
  const slidesRef = useContext(CarouselContext)[3];
  useEffect(() => {
    // Skip observation when the component is controlled or not mounted
    if (controlledActiveIndex != null || !rotatorRef.current) return undefined;

    const slides = [...rotatorRef.current.children];
    slidesRef.current = slides;

    const observer = new IntersectionObserver(
      entries => {
        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        if (intersectingEntry) {
          jumpTo(slides.indexOf(intersectingEntry.target));
        }
      },
      { threshold: 0.5 },
    );
    slides.forEach(slide => {
      observer.observe(slide);
    });

    return () => {
      observer.disconnect();
    };
  }, [children, controlledActiveIndex, jumpTo, slidesRef]);

  return (
    <Flex
      ref={rotatorRef}
      aria-atomic={false}
      aria-live={isPlaying ? 'off' : 'polite'}
      onMouseDown={e => {
        // Disable mouse wheel scrolling between slides
        // TODO: if (e.button === 1) e.preventDefault();
      }}
      my={negateResponsiveValue(spacingY != null ? spacingY : spacing)}
      overflow={
        // Disable user-initiated scrolling when the component is controlled
        controlledActiveIndex != null ? 'hidden' : 'auto'
      }
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
