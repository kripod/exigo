import QuizItem from '../models/QuizItem';

export default interface QuizItemEvaluatorProps<T extends QuizItem = QuizItem> {
  item: T;
  onChange: (response: T['solution']) => void;
}
