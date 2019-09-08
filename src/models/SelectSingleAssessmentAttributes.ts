import SelectChoice from './SelectChoice';

export default interface SelectSingleAssessmentAttributes {
  choices: SelectChoice[];
  solutionID?: SelectChoice['id'];
}
