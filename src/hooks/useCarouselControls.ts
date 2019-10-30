import { useContext } from 'react';
import CarouselContext from '../components/CarouselContext';

export default function useCarouselControls() {
  const [
    ,
    ,
    ,
    [shownIndex],
    [targetIndex, setTargetIndex],
    [totalCount],
    [isPlaying, setPlaying],
  ] = useContext(CarouselContext);

  return {
    shownIndex,
    targetIndex,
    setTargetIndex,
    totalCount,

    isPlaying,
    togglePlaying() {
      setPlaying(prevPlaying => !prevPlaying);
    },
  };
}
