import { useContext } from 'react';
import CarouselContext from '../components/CarouselContext';

export default function useCarouselActiveIndexState() {
  return useContext(CarouselContext)[1];
}
