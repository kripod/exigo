import { makeSchema } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';
import * as path from 'path';

import MultipleOptionsQuizItemParams from './MultipleOptionsQuizItemParams';
import Mutation from './Mutation';
import NumericQuizItemParams from './NumericQuizItemParams';
import Option from './Option';
import Query from './Query';
import Quiz from './Quiz';
import QuizItem from './QuizItem';
import User from './User';

export default makeSchema({
  types: [
    Query,
    Mutation,
    MultipleOptionsQuizItemParams,
    NumericQuizItemParams,
    Option,
    Quiz,
    QuizItem,
    User,
  ],
  plugins: [
    nexusPrismaPlugin({
      inputs: {
        // TODO: Remove when https://github.com/prisma-labs/nexus-prisma/pull/532 gets resolved
        photon: require.resolve('@generated/photon'),
      },
    }),
  ],
  outputs: {
    typegen: path.join(
      __dirname,
      '../../node_modules/@types/nexus-typegen/index.d.ts',
    ),
  },
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
