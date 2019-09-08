import Assessment from './Assessment';
import AssessmentType from './AssessmentType';
import SelectChoice from './SelectChoice';

export default interface SelectMultipleAssessment
  extends Assessment<AssessmentType.SELECT_MULTIPLE> {
  choices: SelectChoice[];
  solutionIDs?: SelectChoice['id'][];
}
