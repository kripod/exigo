import { createContext } from 'react';

const CarouselContext = createContext<
  [
    boolean,
    [number, React.Dispatch<React.SetStateAction<number>>],
    React.MutableRefObject<HTMLElement[]>,
    boolean,
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  ]
>([false, [0, () => {}], { current: [] }, false, [false, () => {}]]);

export default CarouselContext;
