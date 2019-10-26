import { useContext, useCallback } from 'react';
import CarouselContext from '../components/CarouselContext';
import { mod } from '../utils/math';

export default function useCarouselControls() {
  const [
    ,
    ,
    ,
    [activeIndex, setActiveIndex],
    [totalCount],
    [isPlaying, setPlaying],
    isInfinite,
  ] = useContext(CarouselContext);

  const goTo = useCallback(
    (index: React.SetStateAction<number>) => {
      setActiveIndex(prevIndex => {
        const nextIndex =
          typeof index !== 'function' ? index : index(prevIndex);
        if (nextIndex < 0 || nextIndex >= totalCount) return prevIndex;
        return nextIndex;
      });
    },
    [setActiveIndex, totalCount],
  );

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
