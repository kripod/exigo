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
    setTargetIndex,
    totalCount,

    isPlaying,
    togglePlaying() {
      setPlaying(prevPlaying => !prevPlaying);
    },
  };
}
