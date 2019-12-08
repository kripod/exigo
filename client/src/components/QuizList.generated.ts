import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from '../models.generated.d';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type GetQuizzesQueryVariables = {};

export type GetQuizzesQuery = { __typename?: 'Query' } & {
  quizzes: Array<
    { __typename?: 'Quiz' } & Pick<Types.Quiz, 'id' | 'title'> & {
        author: { __typename?: 'User' } & Pick<Types.User, 'name'>;
      }
  >;
};

export const GetQuizzesDocument = gql`
  query GetQuizzes {
    quizzes {
      id
      title
      author {
        name
      }
    }
  }
`;

export function useGetQuizzesQuery(
  options: Omit<Urql.UseQueryArgs<GetQuizzesQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<GetQuizzesQuery>({
    query: GetQuizzesDocument,
    ...options,
  });
}
