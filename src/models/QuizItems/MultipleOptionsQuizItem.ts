import Option from '../Option';
import QuizItemBase from '../QuizItemBase';
import QuizItemType from '../QuizItemType';

export default interface MultipleOptionsQuizItem
  extends QuizItemBase<QuizItemType.MULTIPLE_OPTIONS, Option['id'][]> {
  options: Option[];
  constraints?: {
    minCount?: number;
    maxCount?: number;
  };
}
