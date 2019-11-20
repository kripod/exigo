import { hash } from 'bcryptjs';
import { mutationType, stringArg } from 'nexus';

const BCRYPT_SALT_ROUNDS = 10;

export default mutationType({
  definition(t) {
    t.field('createOneUser', {
      type: 'User',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      async resolve(_root, { email, password }, ctx) {
        const passwordHash = await hash(password || '', BCRYPT_SALT_ROUNDS);
        return ctx.photon.users.create({ data: { email, passwordHash } });
      },
    });

    t.crud.createOneQuiz();
    t.crud.updateOneQuiz();
    t.crud.deleteOneQuiz();
  },
});
