import SelectChoice from './SelectChoice';

export default interface SelectSingleQuiz {
  choices: SelectChoice[];
  solutionID?: SelectChoice['id'];
}
