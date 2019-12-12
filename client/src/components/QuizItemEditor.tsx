import React from 'react';

import QuizItemType from '../models/QuizItemType';
import QuizItemEditorProps from './QuizItemEditorProps';
import MultipleOptionsEditor from './QuizItemEditors/MultipleOptionsEditor';
import NumericEditor from './QuizItemEditors/NumericEditor';

export default function QuizItemEditor({
  item,
  ...restProps
}: QuizItemEditorProps) {
  if (item.type === QuizItemType.MULTIPLE_OPTIONS) {
    return <MultipleOptionsEditor item={item} {...restProps} />;
  }

  if (item.type === QuizItemType.NUMERIC) {
    return <NumericEditor item={item} {...restProps} />;
  }

  return null;
}
