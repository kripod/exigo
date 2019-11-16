import QuizItem from '../models/QuizItem';

export default interface QuizItemEditorProps<T extends QuizItem = QuizItem> {
  item: T;
  onChange: (item: T) => void;
}
