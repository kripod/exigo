import { createContext } from 'react';

const CarouselContext = createContext<
  [
    boolean,
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    [number, React.Dispatch<React.SetStateAction<number>>],
    [number, React.Dispatch<React.SetStateAction<number>>],
  ]
>([false, [false, () => {}], [0, () => {}], [1, () => {}]]);

export default CarouselContext;
