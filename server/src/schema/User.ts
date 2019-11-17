import { objectType } from 'nexus';

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.email();
    t.model.passwordHash();
    t.model.name();
    t.model.quizzes();
  },
});

export default User;
