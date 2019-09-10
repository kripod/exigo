import AssessmentType from './AssessmentType';
import SelectSingleAssessment from './SelectSingleAssessment';
import SelectMultipleAssessment from './SelectMultipleAssessment';

export interface AssessmentBase {
  item: string;
}

type Assessment = AssessmentBase &
  (
    | ({
        type: AssessmentType.SELECT_SINGLE;
      } & SelectSingleAssessment)
    | ({
        type: AssessmentType.SELECT_MULTIPLE;
      } & SelectMultipleAssessment));

// eslint-disable-next-line no-undef
export default Assessment;
