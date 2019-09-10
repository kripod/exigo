import SelectChoice from './SelectChoice';

export default interface SelectMultipleQuiz {
  choices: SelectChoice[];
  solutionIDs?: SelectChoice['id'][];
}
