import { Flex, FlexProps, usePrevious } from '@chakra-ui/core';
import { css } from '@emotion/core';
import React, { useContext, useEffect, useRef } from 'react';
import { useInterval, useWindowSize } from 'web-api-hooks';
import useCarouselControls from '../hooks/useCarouselControls';
import CarouselContext from './CarouselContext';
import CarouselSlide from './CarouselSlide';

// TODO: https://www.w3.org/TR/wai-aria-practices-1.1/#tabbed-carousel-elements

export interface CarouselRotatorProps extends FlexProps {
  children: React.ReactElement[];
  playInterval?: number;
  activeIndex?: number;
}

export default function CarouselRotator({
  children,
  playInterval = 5000,
  activeIndex: controlledActiveIndex,
  style,
  ...restProps
}: CarouselRotatorProps) {
  const [
    isHovered,
    isFocused,
    [disableAutoPause],
    [uncontrolledActiveIndex, setUncontrolledActiveIndex],
    [slides, setSlides],
  ] = useContext(CarouselContext);
  const { isPlaying, jump } = useCarouselControls();
  const activeIndex =
    controlledActiveIndex != null
      ? controlledActiveIndex
      : uncontrolledActiveIndex;

  // Auto-rotate slides if desired
  useInterval(
    () => {
      jump(+1);
    },
    isPlaying && ((!isHovered && !isFocused) || disableAutoPause)
      ? playInterval
      : null,
  );

  // Track scroll position
  const rotatorRef = useRef<HTMLElement>();
  useEffect(() => {
    // Skip observation when the component is controlled or not mounted
    if (controlledActiveIndex != null || !rotatorRef.current) return undefined;

    const nextSlides = [...rotatorRef.current.children];
    setSlides(nextSlides as HTMLElement[]);

    const observer = new IntersectionObserver(
      entries => {
        // Ignore unintentional scrolls (e.g. during window resize)
        if (isHovered) {
          const intersectingEntry = entries.find(entry => entry.isIntersecting);
          if (intersectingEntry) {
            // Scroll events shall not be fired here, so `goTo` cannot be used
            setUncontrolledActiveIndex(
              nextSlides.indexOf(intersectingEntry.target),
            );
          }
        }
      },
      { threshold: 0.5 },
    );
    nextSlides.forEach(slide => {
      observer.observe(slide);
    });

    return () => {
      observer.disconnect();
    };
  }, [
    children,
    controlledActiveIndex,
    isHovered,
    setSlides,
    setUncontrolledActiveIndex,
  ]);

  // Re-snap scroll position when content of the snapport changes
  // TODO: Remove when browsers handle this natively
  const [windowWidth] = useWindowSize();
  const prevWindowWidth = usePrevious(windowWidth);
  useEffect(() => {
    if (windowWidth !== prevWindowWidth && activeIndex < slides.length) {
      const slide = slides[activeIndex];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      slide.parentElement!.scroll({
        left: slide.offsetLeft,
        behavior: 'auto',
      });
    }
  }, [activeIndex, prevWindowWidth, slides, windowWidth]);

  return (
    <Flex
      ref={rotatorRef}
      aria-atomic={false}
      aria-live={isPlaying ? 'off' : 'polite'}
      onMouseDown={e => {
        // Disable mouse wheel scrolling between slides
        if (e.button === 1) e.preventDefault();
      }}
      position="relative"
      overflow={
        // Disable user-initiated scrolling when the component is controlled
        controlledActiveIndex != null ? 'hidden' : 'auto'
      }
      css={css`
        /* Support every version of CSS Scroll Snap */
        scroll-snap-type: x mandatory;
        scroll-snap-type-x: mandatory;
        scroll-snap-points-x: repeat(100%);

        /* TODO: Leave vendor prefixing to the underlying library */
        ::-webkit-scrollbar {
          width: 0;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;

        @media (prefers-reduced-motion: reduce) {
          scroll-behavior: auto;
        }
      `}
      style={{ scrollBehavior: 'smooth', ...style }}
      {...restProps}
    >
      {React.Children.map(children, (child, i) => (
        // Labels are lifted up to comply with WAI-ARIA Authoring Practices
        <CarouselSlide
          inert={i !== activeIndex ? '' : undefined}
          aria-label={child.props['aria-label']}
          aria-labelledby={child.props['aria-labelledby']}
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
