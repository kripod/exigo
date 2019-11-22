import * as Types from '../models.generated.d';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type GetQuizzesQueryVariables = {};

export type GetQuizzesQuery = { __typename?: 'Query' } & {
  quizzes: Array<{ __typename?: 'Quiz' } & Pick<Types.Quiz, 'id' | 'title'>>;
};

export const GetQuizzesDocument = gql`
  query GetQuizzes {
    quizzes {
      id
      title
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
