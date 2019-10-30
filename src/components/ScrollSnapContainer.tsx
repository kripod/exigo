import { Flex, FlexProps } from '@chakra-ui/core';
import { css } from '@emotion/core';
import ResizeObserverPolyfill from '@juggle/resize-observer';
import React, { useRef, useState } from 'react';
import { useChanging } from 'state-hooks';
import { usePreferredMotionIntensity, useSize } from 'web-api-hooks';
import useLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

export interface ScrollSnapContainerProps extends FlexProps {
  targetIndex?: number | null;
  onShownIndexChange: (index: number) => void;
}

export default function ScrollSnapContainer({
  children,
  targetIndex,
  onShownIndexChange,
  ...restProps
}: ScrollSnapContainerProps) {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const ref = useRef<HTMLElement>(null);

  // Track shown element's index based on scroll position
  const [scrollLeft, setScrollLeft] = useState(0);
  const [shownIndex, setShownIndex] = useState(0);
  useLayoutEffect(() => {
    const nextIndex = Math.round(
      (ref.current!.scrollLeft / ref.current!.scrollWidth) *
        React.Children.count(children),
    );
    setShownIndex(nextIndex);
    onShownIndexChange(nextIndex);
  }, [children, onShownIndexChange, scrollLeft]);

  // Re-snap scroll position when content of the snapport changes
  // TODO: Remove when browsers handle this natively
  const [width] = useSize(
    ref,
    (typeof window !== 'undefined' && window.ResizeObserver) ||
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

  // TODO: Replace this check with CSS when no polyfill is required
  const preferReducedMotion = usePreferredMotionIntensity() === 'reduce';

  // Scroll to the desired target each time it changes
  useLayoutEffect(() => {
    if (targetIndex != null) {
      const targetChild = ref.current!.children[targetIndex] as HTMLElement;
      ref.current!.scroll({
        left: targetChild.offsetLeft,
        ...(!preferReducedMotion && { behavior: 'smooth' }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIndex]);

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

        /* Optimize scrolling behavior */
        will-change: scroll-position;
        -webkit-overflow-scrolling: touch;

        /* Hide scrollbar */
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
