import SelectChoice from './SelectChoice';

export default interface SelectMultipleAssessment {
  choices: SelectChoice[];
  solutionIDs?: SelectChoice['id'][];
}
