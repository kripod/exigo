import AssessmentType from './AssessmentType';
import SelectSingleAssessmentAttributes from './SelectSingleAssessmentAttributes';
import SelectMultipleAssessmentAttributes from './SelectMultipleAssessmentAttributes';

export interface AssessmentAttributesBase {
  item: string;
}

type AssessmentAttributes = AssessmentAttributesBase &
  (
    | ({
        type: AssessmentType.SELECT_SINGLE;
      } & SelectSingleAssessmentAttributes)
    | ({
        type: AssessmentType.SELECT_MULTIPLE;
      } & SelectMultipleAssessmentAttributes));

// eslint-disable-next-line no-undef
export default AssessmentAttributes;
