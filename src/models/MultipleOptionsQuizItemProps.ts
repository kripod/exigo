import Option from './Option';

export default interface MultipleOptionsQuizItemProps {
  options: Option[];
  solution?: Option['id'][];
}
