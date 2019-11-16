import React from 'react';

import QuizItemType from '../models/QuizItemType';
import QuizItemEvaluatorProps from './QuizItemEvaluatorProps';
import MultipleOptionsEvaluator from './QuizItemEvaluators/MultipleOptionsEvaluator';
import NumericEvaluator from './QuizItemEvaluators/NumericEvaluator';

export default function QuizItemEvaluator({
  item,
  ...restProps
}: QuizItemEvaluatorProps) {
  if (item.type === QuizItemType.MULTIPLE_OPTIONS) {
    return <MultipleOptionsEvaluator item={item} {...restProps} />;
  }

  if (item.type === QuizItemType.NUMERIC) {
    return <NumericEvaluator item={item} {...restProps} />;
  }

  return null;
}
