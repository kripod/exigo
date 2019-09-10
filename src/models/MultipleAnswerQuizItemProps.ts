import Option from './Option';

export default interface MultipleAnswerQuizItemProps {
  choices: Option[];
  solutionIDs?: Option['id'][];
}
