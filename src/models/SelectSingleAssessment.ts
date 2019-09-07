import Assessment from './Assessment';
import AssessmentType from './AssessmentType';

export default interface SelectSingleAssessment
  extends Assessment<AssessmentType.SELECT_SINGLE> {
  solution: string;
  distractors: string[];
}
