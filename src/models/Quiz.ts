import QuizType from './QuizType';
import SelectSingleQuizOptions from './SelectSingleQuizOptions';
import SelectMultipleQuizOptions from './SelectMultipleQuizOptions';

export interface QuizBase {
  item: string;
}

type Quiz = QuizBase &
  (
    | ({ type: QuizType.SELECT_SINGLE } & SelectSingleQuizOptions)
    | ({ type: QuizType.SELECT_MULTIPLE } & SelectMultipleQuizOptions));

// eslint-disable-next-line no-undef
export default Quiz;
