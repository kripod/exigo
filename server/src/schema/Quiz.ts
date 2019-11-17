import { objectType } from 'nexus';

const Quiz = objectType({
  name: 'Quiz',
  definition(t) {
    t.model.id();
    t.model.author();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.isPrivate();
    t.model.title();
    t.model.timeLimitInMinutes();
    t.model.items();
  },
});

export default Quiz;
