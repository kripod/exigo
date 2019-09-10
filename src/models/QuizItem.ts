import QuizItemType from './QuizItemType';
import MultipleAnswerQuizItemOptions from './MultipleAnswerQuizItemOptions';
import MultipleChoiceQuizItemOptions from './MultipleChoiceQuizItemOptions';

export interface QuizItemBase {
  stem: string;
}

type QuizItem = QuizItemBase &
  (
    | ({ type: QuizItemType.MULTIPLE_CHOICE } & MultipleChoiceQuizItemOptions)
    | ({ type: QuizItemType.MULTIPLE_ANSWER } & MultipleAnswerQuizItemOptions));

// eslint-disable-next-line no-undef
export default QuizItem;
