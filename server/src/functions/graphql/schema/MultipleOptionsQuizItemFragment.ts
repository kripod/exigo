import { objectType } from 'nexus';

export default objectType({
  name: 'MultipleOptionsQuizItemFragment',
  definition(t) {
    t.model.id();
    t.model.quizItem();
    t.model.options();
    t.model.constraints_minCount();
    t.model.constraints_maxCount();
  },
});
