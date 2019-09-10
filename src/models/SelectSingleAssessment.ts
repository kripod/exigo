import SelectChoice from './SelectChoice';

export default interface SelectSingleAssessment {
  choices: SelectChoice[];
  solutionID?: SelectChoice['id'];
}
