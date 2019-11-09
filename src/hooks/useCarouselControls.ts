import { useCallback, useContext } from 'react';
import CarouselContext from '../components/CarouselContext';

export default function useCarouselControls() {
  const [
    ,
    ,
    ,
    [shownIndex, setShownIndex],
    [, setTargetIndex],
    [totalCount],
    [isPlaying, setPlaying],
  ] = useContext(CarouselContext);

  return {
    shownIndex,
    setShownIndex: useCallback(
      (value: React.SetStateAction<number>) => {
        // Avoid adding a dependency to `shownIndex`
        setShownIndex(prevShownIndex => {
          setTargetIndex(prevTargetIndex => {
            const prevIndex =
              prevTargetIndex != null ? prevTargetIndex : prevShownIndex;
            return typeof value === 'function'
              ? value(prevIndex)
              : value + prevIndex;
          });
          return prevShownIndex;
        });
      },
      [setShownIndex, setTargetIndex],
    ),
    totalCount,

    isPlaying,
    togglePlaying: useCallback(() => {
      setPlaying(prevPlaying => !prevPlaying);
    }, [setPlaying]),
  };
}
