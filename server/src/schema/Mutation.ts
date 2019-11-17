import { mutationType } from 'nexus';

export default mutationType({
  definition(t) {
    t.crud.createOneUser();
  },
});
