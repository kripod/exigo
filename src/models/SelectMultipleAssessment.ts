import Assessment from './Assessment';
import AssessmentType from './AssessmentType';
import SelectChoice from './SelectChoice';

export interface SelectMultipleAssessmentProps {
  choices: SelectChoice[];
  solutionIDs?: SelectChoice['id'][];
}

export default interface SelectMultipleAssessment
  extends Assessment<AssessmentType.SELECT_MULTIPLE>,
    SelectMultipleAssessmentProps {}
