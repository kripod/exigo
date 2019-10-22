import { useContext } from 'react';
import CarouselContext from '../components/CarouselContext';
import { mod } from '../utils/math';

export default function useCarouselControls() {
  const [
    infinite,
    [isPlaying, setIsPlaying],
    [activeIndex, setActiveIndex],
    { current: slides },
  ] = useContext(CarouselContext);

  return {
    isPlaying,
    togglePlaying() {
      setIsPlaying(prevIsPlaying => !prevIsPlaying);
    },

    activeIndex,
    slideCount: slides.length,
    jumpTo: setActiveIndex,
    jump(delta: number) {
      setActiveIndex(prevActiveIndex => {
        const sum = prevActiveIndex + delta;
        return infinite ? mod(sum, slides.length) : sum;
      });
    },
  };
}
