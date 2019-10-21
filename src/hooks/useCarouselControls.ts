import { useContext } from 'react';
import CarouselContext from '../components/CarouselContext';
import { mod } from '../utils/math';

export default function useCarouselControls() {
  const [
    infinite,
    [isPlaying, setIsPlaying],
    [activeIndex, setActiveIndex],
    [slideCount],
  ] = useContext(CarouselContext);

  return {
    isPlaying,
    togglePlaying() {
      setIsPlaying(prevIsPlaying => !prevIsPlaying);
    },

    activeIndex,
    slideCount,
    jumpTo: setActiveIndex,
    jump(delta: number) {
      setActiveIndex(prevActiveIndex => {
        const sum = prevActiveIndex + delta;
        return infinite ? mod(sum, slideCount) : sum;
      });
    },
  };
}
