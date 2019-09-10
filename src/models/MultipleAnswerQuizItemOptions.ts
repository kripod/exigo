import SelectChoice from './SelectChoice';

export default interface MultipleAnswerQuizItemOptions {
  choices: SelectChoice[];
  solutionIDs?: SelectChoice['id'][];
}
