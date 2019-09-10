import AssessmentType from './AssessmentType';
import SelectSingleAssessmentAttributes from './SelectSingleAssessmentAttributes';
import SelectMultipleAssessmentAttributes from './SelectMultipleAssessmentAttributes';

interface AssessmentBase {
  item: string;
}

type Assessment = AssessmentBase &
  (
    | ({
        type: AssessmentType.SELECT_SINGLE;
      } & SelectSingleAssessmentAttributes)
    | ({
        type: AssessmentType.SELECT_MULTIPLE;
      } & SelectMultipleAssessmentAttributes));

// eslint-disable-next-line no-undef
export default Assessment;
