import { useContext } from 'react';
import CarouselContext from '../components/CarouselContext';
import { mod } from '../utils/math';

export default function useCarouselControls() {
  const [
    infinite,
    [isPlaying, setPlaying],
    [activeIndex, setActiveIndex],
    slidesRef,
  ] = useContext(CarouselContext);

  function goTo(value: React.SetStateAction<number>) {
    setActiveIndex(prevActiveIndex => {
      const nextActiveIndex =
        typeof value !== 'function' ? value : value(prevActiveIndex);
      console.log(nextActiveIndex);
      slidesRef.current[nextActiveIndex].scrollIntoView(); // TODO: Smooth scrolling
      return nextActiveIndex;
    });
  }

  return {
    isPlaying,
    togglePlaying() {
      setPlaying(prevIsPlaying => !prevIsPlaying);
    },

    activeIndex,
    slideCount: slidesRef.current.length,
    goTo,
    jump(delta: number) {
      goTo(prevActiveIndex => {
        const sum = prevActiveIndex + delta;
        const slideCount = slidesRef.current.length;
        return Math.min(
          slideCount - 1,
          Math.max(0, infinite ? mod(sum, slideCount) : sum),
        );
      });
    },
  };
}
