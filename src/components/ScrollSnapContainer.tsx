import { Flex, FlexProps } from '@chakra-ui/core';
import { css } from '@emotion/core';
import ResizeObserverPolyfill from '@juggle/resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import {
  usePreferredMotionIntensity,
  useSize,
  useWindowSize,
} from 'web-api-hooks';

function scroll(
  container: HTMLElement,
  targetIndex: number,
  behavior: ScrollOptions['behavior'] = 'auto',
) {
  const targetChild = container.children[targetIndex] as HTMLElement;
  container.scroll({
    left: targetChild.offsetLeft,
    behavior,
  });
}

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
  const [shownIndex, setShownIndex] = useState(0);

  // Re-snap scroll position when content of the snapport changes
  // TODO: Remove when browsers handle this natively
  const [width] = useSize(
    ref,
    (typeof window !== 'undefined' && window.ResizeObserver) ||
      ((ResizeObserverPolyfill as unknown) as typeof ResizeObserver),
  );
  // Handle device orientation changes properly on iOS
  const [windowWidth] = useWindowSize();
  useEffect(() => {
    scroll(ref.current!, targetIndex != null ? targetIndex : shownIndex);
    // Changing indexes shall not have an effect on scroll restoration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, windowWidth]);

  // TODO: Replace this check with CSS when no polyfill is required
  const preferReducedMotion = usePreferredMotionIntensity() === 'reduce';

  // Scroll to the desired target initially and then each time it changes
  const hasRendered = useRef(false);
  useEffect(() => {
    if (targetIndex != null) {
      scroll(
        ref.current!,
        targetIndex,
        preferReducedMotion || !hasRendered.current ? 'auto' : 'smooth',
      );
    }
    hasRendered.current = true;
  }, [preferReducedMotion, targetIndex]);

  // Track shown element's index based on scroll position
  const [nextIndex, setNextIndex] = useState(0);
  useEffect(() => {
    setShownIndex(nextIndex);
    onShownIndexChange(nextIndex);
  }, [nextIndex, onShownIndexChange]);

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
        setNextIndex(
          Math.round(
            (ref.current!.scrollLeft / ref.current!.scrollWidth) *
              React.Children.count(children),
          ),
        );
      }}
      {...restProps}
    >
      {children}
    </Flex>
  );
}
