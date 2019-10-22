import { useContext } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import CarouselContext from '../components/CarouselContext';
import { mod } from '../utils/math';

// TODO: Follow the status of element scrolling methods and remove polyfill
if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}

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

      const slide = slidesRef.current[nextActiveIndex];
      if (slide.parentElement) {
        slide.parentElement.scroll({
          top: slide.offsetTop,
          left: slide.offsetLeft,
          behavior: 'smooth',
        });
      }
      return nextActiveIndex;
    });
  }

  return {
    isPlaying,
    togglePlaying() {
      setPlaying(prevIsPlaying => !prevIsPlaying);
    },

    activeIndex,
    getTotalCount() {
      return slidesRef.current.length;
    },
    goTo,
    jump(delta: number) {
      goTo(prevActiveIndex => {
        const sum = prevActiveIndex + delta;
        return infinite ? mod(sum, slidesRef.current.length) : sum;
      });
    },
  };
}
