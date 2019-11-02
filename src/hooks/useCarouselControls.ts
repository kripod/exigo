import { useContext } from 'react';
import CarouselContext from '../components/CarouselContext';

export default function useCarouselControls() {
  const [
    ,
    ,
    ,
    [shownIndex],
    [, setTargetIndex],
    [totalCount],
    [isPlaying, setPlaying],
  ] = useContext(CarouselContext);

  return {
    shownIndex,
    setShownIndex(value: React.SetStateAction<number>) {
      setTargetIndex(prevTargetIndex => {
        const prevIndex =
          prevTargetIndex != null ? prevTargetIndex : shownIndex;
        return typeof value === 'function'
          ? value(prevIndex)
          : value + prevIndex;
      });
    },
    totalCount,

    isPlaying,
    togglePlaying() {
      setPlaying(prevPlaying => !prevPlaying);
    },
  };
}
