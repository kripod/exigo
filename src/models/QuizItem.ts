import MultipleOptionsQuizItemProps from './MultipleOptionsQuizItemProps';
import QuizItemType from './QuizItemType';

export interface QuizItemBase {
  id: number;
  stem: string;
}

type QuizItem = QuizItemBase &
  (
    | ({ type: QuizItemType.MULTIPLE_OPTIONS } & MultipleOptionsQuizItemProps)
    | ({ type: QuizItemType.MULTIPLE_OPTIONS } & MultipleOptionsQuizItemProps)
  ); // TODO

// eslint-disable-next-line no-undef
export default QuizItem;
