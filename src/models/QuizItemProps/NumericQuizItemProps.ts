export default interface NumericQuizItemProps {
  precision?: number;
  stepSize?: number;
  constraints?: {
    minValue?: number;
    maxValue?: number;
  };
  solution?: number;
}
