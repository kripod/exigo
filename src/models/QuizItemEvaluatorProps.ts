export default interface QuizItemEvaluatorProps<T> {
  onChange: (response: T | undefined) => void;
}
