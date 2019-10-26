import { Flex, FlexProps } from '@chakra-ui/core';
import { css } from '@emotion/core';
import ResizeObserverPolyfill from '@juggle/resize-observer';
import React, { useRef, useState, useEffect } from 'react';
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

  // TODO: Replace with https://github.com/w3c/csswg-drafts/issues/1562
  const willScroll = useRef(false);

  // TODO: Replace this check with CSS when no polyfill is required
  const preferReducedMotion = usePreferredMotionIntensity() === 'reduce';

  // Handle prop changes
  useLayoutEffect(() => {
    const shownChild = ref.current!.children[shownIndex] as HTMLElement;
    willScroll.current = true;
    ref.current!.scroll({
      left: shownChild.offsetLeft,
      ...(!preferReducedMotion && { behavior: 'smooth' }),
    });
  }, [preferReducedMotion, shownIndex]);

  // Handle scrolling
  const [scrollLeft, setScrollLeft] = useState(0);
  const isScrollLeftChanging = useChanging(scrollLeft);
  useEffect(() => {
    if (isScrollLeftChanging) {
      willScroll.current = false;
    } else if (onProposedIndexChange && !willScroll.current) {
      const proposedIndex = Math.round(
        (scrollLeft / ref.current!.scrollWidth) *
          React.Children.count(children),
      );
      if (proposedIndex !== shownIndex) {
        onProposedIndexChange(proposedIndex);
      }
    }
  }, [
    children,
    isScrollLeftChanging,
    onProposedIndexChange,
    scrollLeft,
    shownIndex,
  ]);

  // Re-snap scroll position when content of the snapport changes
  // TODO: Remove when browsers handle this natively
  const [width] = useSize(
    ref,
    (typeof window !== 'undefined' ? window.ResizeObserver : undefined) ||
      ((ResizeObserverPolyfill as unknown) as typeof ResizeObserver),
  );
  useLayoutEffect(() => {
    ref.current!.scrollLeft =
      (shownIndex / React.Children.count(children)) * ref.current!.scrollWidth;

    alert(
      JSON.stringify({
        scrollLeft: ref.current!.scrollLeft,
        scrollWidth: ref.current!.scrollWidth,
        targetSLeft:
          (shownIndex / React.Children.count(children)) *
          ref.current!.scrollWidth,
      }),
    );
    setTimeout(() => {
      alert(
        JSON.stringify({
          scrollLeft: ref.current!.scrollLeft,
          scrollWidth: ref.current!.scrollWidth,
          targetSLeft:
            (shownIndex / React.Children.count(children)) *
            ref.current!.scrollWidth,
        }),
      );
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

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
