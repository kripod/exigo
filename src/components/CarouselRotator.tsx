import React, { useCallback, useContext, useEffect } from 'react';
import { useInterval } from 'web-api-hooks';
import CarouselContext from './CarouselContext';
import CarouselSlide from './CarouselSlide';
import ScrollSnapContainer, {
  ScrollSnapContainerProps,
} from './ScrollSnapContainer';

// TODO: Follow the status of element scrolling methods and remove polyfill
import 'scroll-behavior-polyfill';

// TODO: https://www.w3.org/TR/wai-aria-practices-1.1/#tabbed-carousel-elements

export interface CarouselRotatorProps
  extends Omit<ScrollSnapContainerProps, 'onShownIndexChange'> {
  children?: React.ReactElement | React.ReactElement[];
  playInterval?: number;
}

export default function CarouselRotator({
  children = [],
  playInterval = 5000,
  ...restProps
}: CarouselRotatorProps) {
  const [
    [isHovered],
    [isFocused],
    [disableAutoPause],
    [shownIndex, setShownIndex],
    [targetIndex, setTargetIndex],
    [totalCount, setTotalCount],
    [isPlaying],
  ] = useContext(CarouselContext);

  // Keep amount of slides updated
  useEffect(() => {
    const nextTotalCount = React.Children.count(children);
    if (nextTotalCount !== totalCount) setTotalCount(nextTotalCount);
  }, [children, setTotalCount, totalCount]);

  // Auto-rotate slides if desired
  useInterval(
    () => {
      setTargetIndex((shownIndex + 1) % totalCount);
    },
    isPlaying && ((!isHovered && !isFocused) || disableAutoPause)
      ? playInterval
      : null,
  );

  return (
    <ScrollSnapContainer
      targetIndex={targetIndex}
      aria-atomic={false}
      aria-live={isPlaying ? 'off' : 'polite'}
      onMouseDown={e => {
        // Disable mouse wheel scrolling between slides
        if (e.button === 1) e.preventDefault();
      }}
      overflow={
        // Disable user-initiated scrolling when a target is specified
        targetIndex != null ? 'hidden' : 'auto'
      }
      onShownIndexChange={useCallback(
        index => {
          // Clear target as soon as a change happens
          setTargetIndex(null);
          setShownIndex(index);
        },
        [setShownIndex, setTargetIndex],
      )}
      {...restProps}
    >
      {React.Children.map(children, (child, i) => (
        // Labels are lifted up to comply with WAI-ARIA Authoring Practices
        <CarouselSlide
          inert={i !== shownIndex ? '' : undefined}
          aria-label={child.props['aria-label']}
          aria-labelledby={child.props['aria-labelledby']}
        >
          {React.cloneElement(child, {
            'aria-label': undefined,
            'aria-labelledby': undefined,
          })}
        </CarouselSlide>
      ))}
    </ScrollSnapContainer>
  );
}
