import { createContext } from 'react';

const CarouselContext = createContext<
  [
    boolean,
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    [number, React.Dispatch<React.SetStateAction<number>>],
    React.MutableRefObject<HTMLElement[]>,
  ]
>([false, [false, () => {}], [0, () => {}], { current: [] }]);

export default CarouselContext;
