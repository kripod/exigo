import React, { useCallback, useContext, useEffect } from 'react';
import { useInterval } from 'web-api-hooks';
import useCarouselControls from '../hooks/useCarouselControls';
import CarouselContext from './CarouselContext';
import CarouselSlide from './CarouselSlide';
import ScrollSnapContainer, {
  ScrollSnapContainerProps,
} from './ScrollSnapContainer';

// TODO: Follow the status of element scrolling methods and remove polyfill
import 'scroll-behavior-polyfill';

// TODO: https://www.w3.org/TR/wai-aria-practices-1.1/#tabbed-carousel-elements

export interface CarouselRotatorProps extends ScrollSnapContainerProps {
  children: React.ReactElement[];
  playInterval?: number;
  shownIndex?: number;
}

export default function CarouselRotator({
  children,
  playInterval = 5000,
  shownIndex: controlledShownIndex,
  ...restProps
}: CarouselRotatorProps) {
  const [
    isHovered,
    isFocused,
    [disableAutoPause],
    [uncontrolledShownIndex, setUncontrolledShownIndex],
    [, setTotalCount],
  ] = useContext(CarouselContext);
  const { isPlaying, jump } = useCarouselControls();
  const shownIndex =
    controlledShownIndex != null
      ? controlledShownIndex
      : uncontrolledShownIndex;

  // Keep amount of slides updated
  useEffect(() => {
    const nextTotalCount = React.Children.count(children);
    setTotalCount(nextTotalCount);
  }, [children, setTotalCount]);

  // Auto-rotate slides if desired
  useInterval(
    () => {
      jump(+1);
    },
    isPlaying && ((!isHovered && !isFocused) || disableAutoPause)
      ? playInterval
      : null,
  );

  return (
    <ScrollSnapContainer
      shownIndex={shownIndex}
      aria-atomic={false}
      aria-live={isPlaying ? 'off' : 'polite'}
      onMouseDown={useCallback(e => {
        // Disable mouse wheel scrolling between slides
        // TODO: if (e.button === 1) e.preventDefault();
      }, [])}
      position="relative"
      overflow={
        // Disable user-initiated scrolling when the component is controlled
        controlledShownIndex != null ? 'hidden' : 'auto'
      }
      onProposedIndexChange={setUncontrolledShownIndex}
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
