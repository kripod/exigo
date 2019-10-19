import Option from './Option';

export default interface MultipleOptionsQuizItemProps {
  options: Option[];
  constraints?: {
    minCount?: number;
    maxCount?: number;
  };
  solution?: Option['id'][];
}
