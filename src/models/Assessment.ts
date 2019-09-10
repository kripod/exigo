import AssessmentType from './AssessmentType';
import SelectSingleAssessmentAttributes from './SelectSingleAssessmentAttributes';
import SelectMultipleAssessmentAttributes from './SelectMultipleAssessmentAttributes';

type Assessment = ({ item: string }) &
  (
    | ({
        type: AssessmentType.SELECT_SINGLE;
      } & SelectSingleAssessmentAttributes)
    | ({
        type: AssessmentType.SELECT_MULTIPLE;
      } & SelectMultipleAssessmentAttributes));

// eslint-disable-next-line no-undef
export default Assessment;
