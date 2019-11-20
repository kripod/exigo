import { queryType } from 'nexus';

export default queryType({
  definition(t) {
    t.crud.quizzes();
  },
});
