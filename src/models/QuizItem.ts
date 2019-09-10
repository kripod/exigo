import QuizItemType from './QuizItemType';
import SelectSingleQuizItemOptions from './SelectSingleQuizItemOptions';
import SelectMultipleQuizItemOptions from './SelectMultipleQuizItemOptions';

export interface QuizItemBase {
  stem: string;
}

type QuizItem = QuizItemBase &
  (
    | ({ type: QuizItemType.SELECT_SINGLE } & SelectSingleQuizItemOptions)
    | ({ type: QuizItemType.SELECT_MULTIPLE } & SelectMultipleQuizItemOptions));

// eslint-disable-next-line no-undef
export default QuizItem;
