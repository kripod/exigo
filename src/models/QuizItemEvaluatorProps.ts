export default interface QuizItemEvaluatorProps<T> {
  showSolution?: boolean;
  onChange: (response: T | undefined) => void;
}
