import Option from './Option';

export default interface MultipleAnswerQuizItemProps {
  choices: Option[];
  solution?: Option['id'][];
}
