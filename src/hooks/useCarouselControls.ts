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

  function goTo(index: React.SetStateAction<number>) {
    setActiveIndex(prevActiveIndex => {
      const nextActiveIndex =
        typeof index !== 'function' ? index : index(prevActiveIndex);
      if (nextActiveIndex < 0 || nextActiveIndex >= slidesRef.current.length)
        return prevActiveIndex;

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
    slidesRef,
    goTo,
    jump(delta: number) {
      goTo(prevActiveIndex => {
        const sum = prevActiveIndex + delta;
        return infinite ? mod(sum, slidesRef.current.length) : sum;
      });
    },
  };
}
