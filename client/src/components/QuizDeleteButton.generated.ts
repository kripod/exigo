import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from '../models.generated.d';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type DeleteQuizMutationVariables = {
  id: Types.Scalars['ID'];
};

export type DeleteQuizMutation = { __typename?: 'Mutation' } & {
  deleteOneQuiz: Types.Maybe<{ __typename?: 'Quiz' } & Pick<Types.Quiz, 'id'>>;
};

export const DeleteQuizDocument = gql`
  mutation DeleteQuiz($id: ID!) {
    deleteOneQuiz(where: { id: $id }) {
      id
    }
  }
`;

export function useDeleteQuizMutation() {
  return Urql.useMutation<DeleteQuizMutation, DeleteQuizMutationVariables>(
    DeleteQuizDocument,
  );
}
