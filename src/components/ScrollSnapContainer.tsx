import { Flex, FlexProps } from '@chakra-ui/core';
import { css } from '@emotion/core';
import ResizeObserverPolyfill from '@juggle/resize-observer';
import React, { useRef, useState } from 'react';
import { usePreferredMotionIntensity, useSize } from 'web-api-hooks';
import useChanging from '../hooks/useChanging';
import useLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

export interface ScrollSnapContainerProps extends FlexProps {
  shownIndex?: number;
  onProposedIndexChange?: (index: number) => void;
}

export default function ScrollSnapContainer({
  shownIndex = 0,
  children,
  onProposedIndexChange,
  ...restProps
}: ScrollSnapContainerProps) {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const ref = useRef<HTMLElement>(null);

  // TODO: Replace this check with CSS when no polyfill is required
  const preferReducedMotion = usePreferredMotionIntensity() === 'reduce';

  // Handle prop changes
  useLayoutEffect(() => {
    const shownChild = ref.current!.children[shownIndex] as HTMLElement;
    ref.current!.scroll({
      left: shownChild.offsetLeft,
      ...(!preferReducedMotion && { behavior: 'smooth' }),
    });
  }, [preferReducedMotion, shownIndex]);

  // Handle user-initiated changes
  const [scrollLeft, setScrollLeft] = useState(shownIndex);
  const isScrollLeftChanging = useChanging(scrollLeft);
  if (!isScrollLeftChanging && ref.current) {
    const proposedIndex = Math.round(
      React.Children.count(children) * (scrollLeft / ref.current.scrollWidth),
    );
    if (proposedIndex !== shownIndex && onProposedIndexChange) {
      onProposedIndexChange(proposedIndex);
    }
  }

  // Re-snap scroll position when content of the snapport changes
  // TODO: Remove when browsers handle this natively
  const [width] = useSize(
    ref,
    (typeof window !== 'undefined' ? window.ResizeObserver : undefined) ||
      ((ResizeObserverPolyfill as unknown) as typeof ResizeObserver),
  );
  // Handle resize events firing prior to layout
  // See: https://openradar.appspot.com/radar?id=5040881597939712
  const isWidthChanging = useChanging(width);
  useLayoutEffect(() => {
    const shownChild = ref.current!.children[shownIndex] as HTMLElement;
    ref.current!.scrollLeft = shownChild.offsetLeft;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWidthChanging, width]);

  return (
    <Flex
      ref={ref}
      css={css`
        /* Support every version of CSS Scroll Snap */
        scroll-snap-type-x: mandatory;
        -ms-scroll-snap-type: mandatory;
        scroll-snap-type: x mandatory;
        -ms-scroll-snap-points-x: snapInterval(0, 100%);
        scroll-snap-points-x: repeat(100%);
        -webkit-overflow-scrolling: touch;

        /* TODO: Leave vendor prefixing to the underlying library */
        ::-webkit-scrollbar {
          display: none;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
      `}
      onScroll={() => {
        setScrollLeft(ref.current!.scrollLeft);
      }}
      {...restProps}
    >
      {children}
    </Flex>
  );
}
