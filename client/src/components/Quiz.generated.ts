import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from '../models.generated.d';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type GetQuizQueryVariables = {
  id: Types.Scalars['ID'];
};

export type GetQuizQuery = { __typename?: 'Query' } & {
  quiz: Types.Maybe<
    { __typename?: 'Quiz' } & Pick<Types.Quiz, 'title'> & {
        items: Array<
          { __typename?: 'QuizItem' } & Pick<
            Types.QuizItem,
            'id' | 'type' | 'stem'
          > & {
              fragmentMultipleOptions: Types.Maybe<
                { __typename?: 'MultipleOptionsQuizItemFragment' } & Pick<
                  Types.MultipleOptionsQuizItemFragment,
                  'constraints_minCount' | 'constraints_maxCount'
                > & {
                    options: Array<
                      { __typename?: 'Option' } & Pick<
                        Types.Option,
                        'id' | 'text' | 'isSolution'
                      >
                    >;
                  }
              >;
              fragmentNumeric: Types.Maybe<
                { __typename?: 'NumericQuizItemFragment' } & Pick<
                  Types.NumericQuizItemFragment,
                  | 'constraints_minValue'
                  | 'constraints_maxValue'
                  | 'precision'
                  | 'stepSize'
                  | 'solution'
                >
              >;
            }
        >;
      }
  >;
};

export type CreateQuizItemMutationVariables = {
  data: Types.QuizItemCreateInput;
};

export type CreateQuizItemMutation = { __typename?: 'Mutation' } & {
  createOneQuizItem: { __typename?: 'QuizItem' } & Pick<Types.QuizItem, 'id'>;
};

export type UpdateQuizItemMutationVariables = {
  id: Types.Scalars['ID'];
  data: Types.QuizItemUpdateInput;
};

export type UpdateQuizItemMutation = { __typename?: 'Mutation' } & {
  updateOneQuizItem: Types.Maybe<
    { __typename?: 'QuizItem' } & Pick<Types.QuizItem, 'id'>
  >;
};

export const GetQuizDocument = gql`
  query GetQuiz($id: ID!) {
    quiz(where: { id: $id }) {
      title
      items {
        id
        type
        stem
        fragmentMultipleOptions {
          constraints_minCount
          constraints_maxCount
          options {
            id
            text
            isSolution
          }
        }
        fragmentNumeric {
          constraints_minValue
          constraints_maxValue
          precision
          stepSize
          solution
        }
      }
    }
  }
`;

export function useGetQuizQuery(
  options: Omit<Urql.UseQueryArgs<GetQuizQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<GetQuizQuery>({ query: GetQuizDocument, ...options });
}
export const CreateQuizItemDocument = gql`
  mutation CreateQuizItem($data: QuizItemCreateInput!) {
    createOneQuizItem(data: $data) {
      id
    }
  }
`;

export function useCreateQuizItemMutation() {
  return Urql.useMutation<
    CreateQuizItemMutation,
    CreateQuizItemMutationVariables
  >(CreateQuizItemDocument);
}
export const UpdateQuizItemDocument = gql`
  mutation UpdateQuizItem($id: ID!, $data: QuizItemUpdateInput!) {
    updateOneQuizItem(where: { id: $id }, data: $data) {
      id
    }
  }
`;

export function useUpdateQuizItemMutation() {
  return Urql.useMutation<
    UpdateQuizItemMutation,
    UpdateQuizItemMutationVariables
  >(UpdateQuizItemDocument);
}
