import QuizItemBase from '../QuizItemBase';
import QuizItemType from '../QuizItemType';

export default interface NumericQuizItem
  extends QuizItemBase<QuizItemType.NUMERIC, number> {
  precision?: number;
  stepSize?: number;
  constraints?: {
    minValue?: number;
    maxValue?: number;
  };
}
