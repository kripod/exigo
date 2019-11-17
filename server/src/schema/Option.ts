import { objectType } from 'nexus';

const Option = objectType({
  name: 'Option',
  definition(t) {
    t.model.id();
    t.model.quizItem();
    t.model.text();
    t.model.isSolution();
  },
});

export default Option;
