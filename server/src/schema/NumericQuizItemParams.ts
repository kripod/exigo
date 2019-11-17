import { objectType } from 'nexus';

const NumericQuizItemParams = objectType({
  name: 'NumericQuizItemParams',
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

export default NumericQuizItemParams;
