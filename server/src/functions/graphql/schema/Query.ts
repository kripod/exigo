import { queryType } from 'nexus';

export default queryType({
  definition(t) {
    t.crud.quiz();
    t.crud.quizzes();
  },
});
