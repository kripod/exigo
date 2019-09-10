import SelectChoice from './SelectChoice';

export default interface SelectSingleQuizOptions {
  choices: SelectChoice[];
  solutionID?: SelectChoice['id'];
}
