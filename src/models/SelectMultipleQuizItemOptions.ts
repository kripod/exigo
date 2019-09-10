import SelectChoice from './SelectChoice';

export default interface SelectMultipleQuizItemOptions {
  choices: SelectChoice[];
  solutionIDs?: SelectChoice['id'][];
}
