import SelectChoice from './SelectChoice';

export default interface MultipleChoiceQuizItemOptions {
  choices: SelectChoice[];
  solutionID?: SelectChoice['id'];
}
