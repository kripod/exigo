import Assessment from './Assessment';
import AssessmentType from './AssessmentType';

export default interface SelectMultipleAssessment
  extends Assessment<AssessmentType.SELECT_MULTIPLE> {
  solution: string[];
  distractors: string[];
}
