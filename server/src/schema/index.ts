import { makeSchema } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';

import Mutation from './Mutation';
import Query from './Query';
import User from './User';

const schema = makeSchema({
  types: [Query, Mutation, User],
  plugins: [
    nexusPrismaPlugin({
      inputs: {
        // TODO: Remove when https://github.com/prisma-labs/nexus-prisma/pull/532 gets resolved
        photon: require.resolve('@generated/photon'),
      },
    }),
  ],
  /*
  typegenAutoConfig: {
    sources: [
      // {
      //   source: '@generated/photon',
      //   alias: 'photon',
      // },
      {
        source: require.resolve('../context'),
        alias: 'context',
      },
    ],
    contextType: 'context.Context',
  },
  */
});

export default schema;
