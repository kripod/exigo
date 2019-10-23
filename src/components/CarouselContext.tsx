import { createContext } from 'react';

const CarouselContext = createContext<
  [
    boolean,
    [number, React.Dispatch<React.SetStateAction<number>>],
    [HTMLElement[], React.Dispatch<React.SetStateAction<HTMLElement[]>>],
    boolean,
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  ]
>([false, [0, () => {}], [[], () => {}], false, [false, () => {}]]);

export default CarouselContext;
