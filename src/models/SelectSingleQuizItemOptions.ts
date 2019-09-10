import SelectChoice from './SelectChoice';

export default interface SelectSingleQuizItemOptions {
  choices: SelectChoice[];
  solutionID?: SelectChoice['id'];
}
