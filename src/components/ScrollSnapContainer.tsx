import { Flex, FlexProps } from '@chakra-ui/core';
import { css } from '@emotion/core';
import ResizeObserverPolyfill from '@juggle/resize-observer';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useChanging } from 'state-hooks';
import { usePreferredMotionIntensity, useSize } from 'web-api-hooks';
import useLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

export interface ScrollSnapContainerProps extends FlexProps {
  targetIndex?: number | null;
  onShownIndexChange: (index: number) => void;
}

function scroll(
  container: HTMLElement,
  targetIndex: number,
  behavior: ScrollOptions['behavior'] = 'auto',
) {
  const targetChild = container.children[targetIndex] as HTMLElement;
  const { offsetLeft } = targetChild;
  container.scroll({
    left: offsetLeft,
    behavior,
  });
  return [targetChild, offsetLeft] as const;
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
  useLayoutEffect(() => {
    // Don't override target-oriented scrolling
    if (targetIndex != null) return;

    const [targetChild, prevOffsetLeft] = scroll(ref.current!, shownIndex);

    // Handle occasional reflow prior to layout
    // See: https://openradar.appspot.com/radar?id=5040881597939712

    if (!window.requestAnimationFrame) return;

    let frameCount = 0;
    function step() {
      if (targetIndex != null || frameCount > 99) return;

      const { offsetLeft } = targetChild;
      if (offsetLeft !== prevOffsetLeft) {
        ref.current!.scrollLeft = offsetLeft;
      } else {
        frameCount += 1;
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);

    // Changing indexes shall not have an effect on scroll restoration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  // Scroll to the desired target when mounting
  useLayoutEffect(() => {
    if (targetIndex != null) {
      scroll(ref.current!, targetIndex);
    }

    // This shall not execute over subsequent rerenders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Replace this check with CSS when no polyfill is required
  const preferReducedMotion = usePreferredMotionIntensity() === 'reduce';

  // Scroll to the desired target initially and then each time it changes
  const hasRendered = useRef(false);
  useLayoutEffect(() => {
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
  const [scrollLeft, setScrollLeft] = useState(0);
  useLayoutEffect(() => {
    const nextIndex = Math.round(
      (scrollLeft / ref.current!.scrollWidth) * React.Children.count(children),
    );
    setShownIndex(nextIndex);
    onShownIndexChange(nextIndex);

    // Changing the amount children doesn't have an effect on the ratio above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onShownIndexChange, scrollLeft]);

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
