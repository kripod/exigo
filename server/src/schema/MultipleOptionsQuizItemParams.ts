import { objectType } from 'nexus';

const MultipleOptionsQuizItemParams = objectType({
  name: 'MultipleOptionsQuizItemParams',
  definition(t) {
    t.model.id();
    t.model.quizItem();
    t.model.options();
    t.model.constraints_minCount();
    t.model.constraints_maxCount();
  },
});

export default MultipleOptionsQuizItemParams;
