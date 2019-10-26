import { useContext, useCallback } from 'react';
import CarouselContext from '../components/CarouselContext';

export default function useCarouselControls() {
  const [
    ,
    ,
    ,
    [shownIndex, setShownIndex],
    [totalCount],
    [isPlaying, setPlaying],
    isInfinite,
  ] = useContext(CarouselContext);

  return {
    isInfinite,

    isPlaying,
    togglePlaying: useCallback(() => {
      setPlaying(prevPlaying => !prevPlaying);
    }, [setPlaying]),

    shownIndex,
    setShownIndex,
    totalCount,
  };
}
