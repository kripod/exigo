import { useContext, useCallback } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import CarouselContext from '../components/CarouselContext';
import { mod } from '../utils/math';

// TODO: Follow the status of element scrolling methods and remove polyfill
if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}

export default function useCarouselControls() {
  const [
    ,
    ,
    ,
    [activeIndex, setActiveIndex],
    [slides],
    [isPlaying, setPlaying],
    isInfinite,
  ] = useContext(CarouselContext);

  const goTo = useCallback(
    (index: React.SetStateAction<number>) => {
      setActiveIndex(prevIndex => {
        const nextIndex =
          typeof index !== 'function' ? index : index(prevIndex);
        if (nextIndex < 0 || nextIndex >= slides.length) return prevIndex;

        const slide = slides[nextIndex];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        slide.parentElement!.scroll({
          left: slide.offsetLeft,
          behavior: 'smooth',
        });
        return nextIndex;
      });
    },
    [setActiveIndex, slides],
  );

  const totalCount = slides.length;

  return {
    isInfinite,

    isPlaying,
    togglePlaying: useCallback(() => {
      setPlaying(prevPlaying => !prevPlaying);
    }, [setPlaying]),

    activeIndex,
    totalCount,
    goTo,
    jump: useCallback(
      (delta: number) => {
        goTo(prevIndex => {
          const sum = prevIndex + delta;
          return isInfinite ? mod(sum, totalCount) : sum;
        });
      },
      [goTo, isInfinite, totalCount],
    ),
  };
}
