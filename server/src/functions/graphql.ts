import { ApolloServer } from 'apollo-server-lambda';

import context from '../graphql/context';
import schema from '../graphql/schema';

const server = new ApolloServer({ schema, context });

// eslint-disable-next-line import/prefer-default-export
export const handler = server.createHandler();
