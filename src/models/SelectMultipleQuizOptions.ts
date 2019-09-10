import SelectChoice from './SelectChoice';

export default interface SelectMultipleQuizOptions {
  choices: SelectChoice[];
  solutionIDs?: SelectChoice['id'][];
}
