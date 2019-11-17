import { queryType } from 'nexus';

const Query = queryType({
  definition(t) {
    t.crud.users();
  },
});

export default Query;
