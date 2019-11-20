import { objectType } from 'nexus';

export default objectType({
  name: 'Option',
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.isSolution();
  },
});
