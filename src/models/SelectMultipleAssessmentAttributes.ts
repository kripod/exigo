import SelectChoice from './SelectChoice';

export default interface SelectMultipleAssessmentAttributes {
  choices: SelectChoice[];
  solutionIDs?: SelectChoice['id'][];
}
