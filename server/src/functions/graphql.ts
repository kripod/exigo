// TODO: Remove when zip-it-and-ship-it gets fixed
// See: https://github.com/netlify/zip-it-and-ship-it/issues/67#issuecomment-549837499
// eslint-disable-next-line import/no-extraneous-dependencies
import '@generated/photon';

import { ApolloServer } from 'apollo-server-lambda';

import context from '../graphql/context';
import schema from '../graphql/schema';

const server = new ApolloServer({ schema, context });

// eslint-disable-next-line import/prefer-default-export
export const handler = server.createHandler();
