import React from 'react';

import QuizItem from '../models/QuizItem';
import QuizItemEvaluatorProps from '../models/QuizItemEvaluatorProps';
import QuizItemType from '../models/QuizItemType';
import MultipleOptionsEvaluator from './QuizItemEvaluators/MultipleOptionsEvaluator';
import NumericEvaluator from './QuizItemEvaluators/NumericEvaluator';

export default function QuizItemEvaluator(
  props: QuizItem & QuizItemEvaluatorProps<unknown>,
) {
  /* eslint-disable react/destructuring-assignment */
  if (props.type === QuizItemType.MULTIPLE_OPTIONS) {
    return <MultipleOptionsEvaluator {...props} />;
  }

  if (props.type === QuizItemType.NUMERIC) {
    return <NumericEvaluator {...props} />;
  }
  /* eslint-enable react/destructuring-assignment */

  return null;
}
