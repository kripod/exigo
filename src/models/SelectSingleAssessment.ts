import Assessment from './Assessment';
import AssessmentType from './AssessmentType';
import SelectChoice from './SelectChoice';

export interface SelectSingleAssessmentBaseProps {
  choices: SelectChoice[];
  solutionID?: SelectChoice['id'];
}

export default interface SelectSingleAssessment
  extends Assessment<AssessmentType.SELECT_SINGLE>,
    SelectSingleAssessmentBaseProps {}
