import AssessmentType from './AssessmentType';

export default interface Assessment<T extends AssessmentType> {
  type: T;
  title: string;
}
