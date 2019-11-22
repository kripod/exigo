import { objectType } from 'nexus';

export default objectType({
  name: 'QuizItem',
  definition(t) {
    t.model.id();
    t.model.quiz();
    t.model.type();
    t.model.stem();
    t.model.fragmentMultipleOptions();
    t.model.fragmentNumeric();
  },
});
