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
      /*
      inputs: {
        photon: path.join(
          __dirname,
          '../../../../../node_modules/@prisma/photon',
        ),
      },
      */
      // TODO: Enable this for Netlify Function deployment
      /*
      outputs: {
        typegen: path.join(__dirname, '../nexus-prisma.generated.d.ts'),
      },
      */
    }),
  ],
  outputs: {
    schema: path.join(__dirname, '../../../../prisma/schema.generated.graphql'),
    /*
    typegen: path.join(
      __dirname,
      '../../../../node_modules/@types/nexus-typegen/index.d.ts',
    ),
    */
  },
  /*
  typegenAutoConfig: {
    sources: [
      { source: '@prisma/photon', alias: 'photon' },
      { source: require.resolve('../context'), alias: 'context' },
    ],
    contextType: 'context.Context',
  },
  */
});
