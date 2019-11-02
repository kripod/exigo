import { Flex, FlexProps } from '@chakra-ui/core';
import { css } from '@emotion/core';
import ResizeObserverPolyfill from '@juggle/resize-observer';
import React, { useEffect, useRef } from 'react';
import {
  usePreferredMotionIntensity,
  useSize,
  useWindowSize,
} from 'web-api-hooks';

const IS_SCROLLING_DEBOUNCE_INTERVAL_MS = 150;

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
  shownIndex: number;
  targetIndex: number | null;
  onShownIndexChange: (index: number) => void;
  onTargetIndexChange: (index: null) => void;
}

export default function ScrollSnapContainer({
  children,
  shownIndex,
  targetIndex,
  onShownIndexChange,
  onTargetIndexChange,
  ...restProps
}: ScrollSnapContainerProps) {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const ref = useRef<HTMLElement>(null);

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

  // Track scrolling and clear target as soon as auto-scrolling has finished
  const scrollingTimeoutID = useRef(0);
  const allowScrolling = useRef(false);
  function restartScrollingTimeout() {
    window.clearTimeout(scrollingTimeoutID.current);
    scrollingTimeoutID.current = window.setTimeout(() => {
      scrollingTimeoutID.current = 0;
      allowScrolling.current = false;
      onTargetIndexChange(null);
    }, IS_SCROLLING_DEBOUNCE_INTERVAL_MS);
  }

  // TODO: Replace this check with CSS when no polyfill is required
  const preferReducedMotion = usePreferredMotionIntensity() === 'reduce';

  // Scroll to the desired target each time it changes
  useEffect(() => {
    if (targetIndex != null) {
      allowScrolling.current = true;
      scroll(
        ref.current!,
        targetIndex,
        preferReducedMotion ? 'auto' : 'smooth',
      );
      onShownIndexChange(targetIndex); // TODO: Remove
    }
  }, [onShownIndexChange, preferReducedMotion, targetIndex]);

  // Track shown element's index based on scroll position
  function handleScroll() {
    /*
    if (allowScrolling.current) {
      const nextIndex = Math.round(
        (ref.current!.scrollLeft / ref.current!.scrollWidth) *
          React.Children.count(children),
      );
      if (nextIndex !== shownIndex) {
        onShownIndexChange(nextIndex);
      }
      restartScrollingTimeout();
    }
    */
  }

  return (
    <Flex
      ref={ref}
      overflowX={
        // Disable user-initiated scrolling when a target is specified
        targetIndex != null ? 'hidden' : 'auto'
      }
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
      onTouchMove={() => {
        allowScrolling.current = true;
      }}
      onScroll={handleScroll}
      {...restProps}
    >
      {children}
    </Flex>
  );
}
