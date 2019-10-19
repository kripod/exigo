import Option from './Option';

export default interface MultipleChoiceQuizItemProps {
  choices: Option[];
  solution?: Option['id'];
}
