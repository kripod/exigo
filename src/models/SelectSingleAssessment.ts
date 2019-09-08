import Assessment from './Assessment';
import AssessmentType from './AssessmentType';
import SelectChoice from './SelectChoice';

export default interface SelectSingleAssessment
  extends Assessment<AssessmentType.SELECT_SINGLE> {
  choices: SelectChoice[];
  solutionID?: SelectChoice['id'];
}
