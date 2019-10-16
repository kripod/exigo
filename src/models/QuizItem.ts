import MultipleAnswerQuizItemProps from './MultipleAnswerQuizItemProps';
import MultipleChoiceQuizItemProps from './MultipleChoiceQuizItemProps';
import QuizItemType from './QuizItemType';

export interface QuizItemBase {
  stem: string;
  // TODO: `timeLimit?: number;` for entire quizzes
}

type QuizItem = QuizItemBase &
  (
    | ({ type: QuizItemType.MULTIPLE_CHOICE } & MultipleChoiceQuizItemProps)
    | ({ type: QuizItemType.MULTIPLE_ANSWER } & MultipleAnswerQuizItemProps));

// eslint-disable-next-line no-undef
export default QuizItem;
