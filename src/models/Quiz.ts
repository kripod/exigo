import QuizType from './QuizType';
import SelectSingleQuiz from './SelectSingleQuiz';
import SelectMultipleQuiz from './SelectMultipleQuiz';

export interface QuizBase {
  item: string;
}

type Quiz = QuizBase &
  (
    | ({ type: QuizType.SELECT_SINGLE } & SelectSingleQuiz)
    | ({ type: QuizType.SELECT_MULTIPLE } & SelectMultipleQuiz));

// eslint-disable-next-line no-undef
export default Quiz;
