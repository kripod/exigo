import { objectType } from 'nexus';

export default objectType({
  name: 'NumericQuizItemFragment',
  definition(t) {
    t.model.id();
    t.model.quizItem();
    t.model.solution();
    t.model.precision();
    t.model.stepSize();
    t.model.constraints_minValue();
    t.model.constraints_maxValue();
  },
});
