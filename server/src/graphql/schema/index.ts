import { makeSchema } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';
import * as path from 'path';

import MultipleOptionsQuizItemFragment from './MultipleOptionsQuizItemFragment';
import Mutation from './Mutation';
import NumericQuizItemFragment from './NumericQuizItemFragment';
import Option from './Option';
import Query from './Query';
import Quiz from './Quiz';
import QuizItem from './QuizItem';
import User from './User';

export default makeSchema({
  types: [
    Query,
    Mutation,
    MultipleOptionsQuizItemFragment,
    NumericQuizItemFragment,
    Option,
    Quiz,
    QuizItem,
    User,
  ],
  plugins: [
    nexusPrismaPlugin({
      inputs: {
        // TODO: Remove when https://github.com/prisma-labs/nexus-prisma/pull/534 gets resolved
        photon: path.join(
          __dirname,
          '../../../../node_modules/@generated/photon',
        ),
      },
    }),
  ],
  outputs: {
    typegen: path.join(
      __dirname,
      '../../../../node_modules/@types/nexus-typegen/index.d.ts',
    ),
  },
});
