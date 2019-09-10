import Option from './Option';

export default interface MultipleChoiceQuizItemProps {
  choices: Option[];
  solutionID?: Option['id'];
}
