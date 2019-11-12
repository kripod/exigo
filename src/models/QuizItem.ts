import MultipleOptionsQuizItemProps from './QuizItemProps/MultipleOptionsQuizItemProps';
import NumericQuizItemProps from './QuizItemProps/NumericQuizItemProps';
import QuizItemType from './QuizItemType';

export interface QuizItemBase {
  id: number;
  stem: string;
}

type QuizItem = QuizItemBase &
  (
    | ({ type: QuizItemType.MULTIPLE_OPTIONS } & MultipleOptionsQuizItemProps)
    | ({ type: QuizItemType.NUMERIC } & NumericQuizItemProps)
  );

export default QuizItem;
