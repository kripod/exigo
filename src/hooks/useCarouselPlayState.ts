import { useContext } from 'react';
import CarouselContext from '../components/CarouselContext';

export default function useCarouselPlayState() {
  return useContext(CarouselContext)[0];
}
