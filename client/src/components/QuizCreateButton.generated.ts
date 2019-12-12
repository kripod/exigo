import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from '../models.generated.d';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type CreateQuizMutationVariables = {
  title: Types.Scalars['String'];
};

export type CreateQuizMutation = { __typename?: 'Mutation' } & {
  createOneQuiz: { __typename?: 'Quiz' } & Pick<Types.Quiz, 'id'>;
};

export const CreateQuizDocument = gql`
  mutation CreateQuiz($title: String!) {
    createOneQuiz(
      data: {
        title: $title
        author: { connect: { email: "john.doe@example.com" } }
      }
    ) {
      id
    }
  }
`;

export function useCreateQuizMutation() {
  return Urql.useMutation<CreateQuizMutation, CreateQuizMutationVariables>(
    CreateQuizDocument,
  );
}
