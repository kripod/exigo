// TODO: Follow the status of element scrolling methods and remove polyfill
import 'scroll-behavior-polyfill';

import { Flex, FlexProps, usePrevious } from '@chakra-ui/core';
import { css } from '@emotion/core';
import ResizeObserverPolyfill from '@juggle/resize-observer';
import React, { useEffect, useRef } from 'react';
import {
  usePreferredMotionIntensity,
  useSize,
  useWindowSize,
} from 'web-api-hooks';

import useCarouselControls from '../hooks/useCarouselControls';

// TODO: https://www.w3.org/TR/wai-aria-practices-1.1/#tabbed-carousel-elements

const IS_SCROLLING_DEBOUNCE_INTERVAL_MS = 150;

let isWebKit = false;
if (typeof CSS !== 'undefined' && CSS.supports('-webkit-touch-callout: none')) {
  isWebKit = true;
}

function scroll(
  container: HTMLElement,
  targetIndex: number,
  behavior: ScrollOptions['behavior'] = 'auto',
) {
  const targetChild = container.children[targetIndex] as HTMLElement;
  if (targetChild != null) {
    /* eslint-disable no-param-reassign */
    // Fix momentum-based scrolling issues in iOS Safari
    // See: https://www.popmotion.io/blog/20170704-manually-set-scroll-while-ios-momentum-scroll-bounces/
    if (isWebKit) container.style.overflowX = 'hidden';
    container.scroll({
      left: targetChild.offsetLeft,
      behavior,
    });
    if (isWebKit) container.style.overflowX = 'auto';
    /* eslint-enable no-param-reassign */
  }
}

export interface ScrollSnapContainerProps extends FlexProps {
  shownIndex: number;
  targetIndex: number | null;
  ignoreTargetChange?: boolean;
  onShownIndexChange: (index: number) => void;
  onTargetIndexChange: (index: null) => void;
  onScrollEnd?: () => void;
}

export default function ScrollSnapContainer({
  children,
  shownIndex,
  targetIndex,
  ignoreTargetChange = false,
  onShownIndexChange,
  onTargetIndexChange,
  onScrollEnd,
  ...restProps
}: ScrollSnapContainerProps) {
  // TODO: Move quiz-specific surrender logic outside of this generic component
  const { totalCount } = useCarouselControls();

  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const ref = useRef<HTMLElement>(null);
  const isScrollObserverEnabled = useRef(false);

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
    isScrollObserverEnabled.current = false;
    scroll(ref.current!, targetIndex != null ? targetIndex : shownIndex);
    // Changing indexes shall not have an effect on scroll restoration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, windowWidth, totalCount]);

  // TODO: Replace this check with CSS when no polyfill is required
  const preferReducedMotion = usePreferredMotionIntensity() === 'reduce';

  // Scroll to the desired target each time it changes
  const prevIgnoreTargetChange = usePrevious(ignoreTargetChange);
  useEffect(() => {
    if (
      !(ignoreTargetChange && prevIgnoreTargetChange) &&
      targetIndex != null
    ) {
      isScrollObserverEnabled.current = true;
      scroll(
        ref.current!,
        targetIndex,
        preferReducedMotion ? 'auto' : 'smooth',
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferReducedMotion, targetIndex]);

  // Track shown element's index based on scroll position
  const scrollingTimeoutID = useRef(0);
  function handleScroll() {
    window.clearTimeout(scrollingTimeoutID.current);
    scrollingTimeoutID.current = window.setTimeout(() => {
      scrollingTimeoutID.current = 0;
      if (onScrollEnd) onScrollEnd(); // TODO: onScrollEnd?();
    }, IS_SCROLLING_DEBOUNCE_INTERVAL_MS);

    if (isScrollObserverEnabled.current) {
      const nextIndex = Math.round(
        (ref.current!.scrollLeft / ref.current!.scrollWidth) *
          React.Children.count(children),
      );
      if (nextIndex !== shownIndex) {
        onShownIndexChange(
          // Restore carousel scroll position after surrendering
          !ignoreTargetChange ? nextIndex : Math.max(0, nextIndex - 1),
        );
        onTargetIndexChange(null);
      }
    }
  }

  return (
    <Flex
      ref={ref}
      overflowX="auto"
      css={css`
        /* Support every version of CSS Scroll Snap */
        scroll-snap-type-x: mandatory;
        -ms-scroll-snap-type: mandatory;
        scroll-snap-type: x mandatory;
        -ms-scroll-snap-points-x: snapInterval(0, 100%);
        scroll-snap-points-x: repeat(100%);

        /* Disable scrolling when necessary */
        touch-action: ${ignoreTargetChange ? 'none' : 'auto'};

        /* Optimize scrolling behavior */
        overscroll-behavior-x: contain;
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
        isScrollObserverEnabled.current = true;
      }}
      onScroll={handleScroll}
      {...restProps}
    >
      {children}
    </Flex>
  );
}
