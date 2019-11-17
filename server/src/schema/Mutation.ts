import { mutationType } from 'nexus';

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser();
  },
});

export default Mutation;
