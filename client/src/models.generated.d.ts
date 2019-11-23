/* eslint-disable import/prefer-default-export */

export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type BooleanFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<Scalars['Boolean']>;
};

export type MultipleOptionsQuizItemFragment = {
  __typename?: 'MultipleOptionsQuizItemFragment';
  constraints_maxCount?: Maybe<Scalars['Int']>;
  constraints_minCount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  options: Array<Option>;
  quizItem: QuizItem;
};

export type MultipleOptionsQuizItemFragmentOptionsArgs = {
  after?: Maybe<Scalars['ID']>;
  before?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type MultipleOptionsQuizItemFragmentCreateOneWithoutFragmentMultipleOptionsInput = {
  connect?: Maybe<MultipleOptionsQuizItemFragmentWhereUniqueInput>;
  create?: Maybe<MultipleOptionsQuizItemFragmentCreateWithoutQuizItemInput>;
};

export type MultipleOptionsQuizItemFragmentCreateWithoutQuizItemInput = {
  constraints_maxCount?: Maybe<Scalars['Int']>;
  constraints_minCount?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  options?: Maybe<OptionCreateManyWithoutOptionsInput>;
};

export type MultipleOptionsQuizItemFragmentUpdateOneWithoutQuizItemInput = {
  connect?: Maybe<MultipleOptionsQuizItemFragmentWhereUniqueInput>;
  create?: Maybe<MultipleOptionsQuizItemFragmentCreateWithoutQuizItemInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<MultipleOptionsQuizItemFragmentUpdateWithoutQuizItemDataInput>;
  upsert?: Maybe<MultipleOptionsQuizItemFragmentUpsertWithoutQuizItemInput>;
};

export type MultipleOptionsQuizItemFragmentUpdateWithoutQuizItemDataInput = {
  constraints_maxCount?: Maybe<Scalars['Int']>;
  constraints_minCount?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  options?: Maybe<OptionUpdateManyWithoutMultipleOptionsQuizItemFragmentInput>;
};

export type MultipleOptionsQuizItemFragmentUpsertWithoutQuizItemInput = {
  create: MultipleOptionsQuizItemFragmentCreateWithoutQuizItemInput;
  update: MultipleOptionsQuizItemFragmentUpdateWithoutQuizItemDataInput;
};

export type MultipleOptionsQuizItemFragmentWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneQuiz: Quiz;
  createOneUser: User;
  deleteOneQuiz?: Maybe<Quiz>;
  updateOneQuiz?: Maybe<Quiz>;
};

export type MutationCreateOneQuizArgs = {
  data: QuizCreateInput;
};

export type MutationCreateOneUserArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type MutationDeleteOneQuizArgs = {
  where: QuizWhereUniqueInput;
};

export type MutationUpdateOneQuizArgs = {
  data: QuizUpdateInput;
  where: QuizWhereUniqueInput;
};

export type NumericQuizItemFragment = {
  __typename?: 'NumericQuizItemFragment';
  constraints_maxValue?: Maybe<Scalars['Float']>;
  constraints_minValue?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  precision?: Maybe<Scalars['Float']>;
  quizItem: QuizItem;
  solution: Scalars['Float'];
  stepSize?: Maybe<Scalars['Float']>;
};

export type NumericQuizItemFragmentCreateOneWithoutFragmentNumericInput = {
  connect?: Maybe<NumericQuizItemFragmentWhereUniqueInput>;
  create?: Maybe<NumericQuizItemFragmentCreateWithoutQuizItemInput>;
};

export type NumericQuizItemFragmentCreateWithoutQuizItemInput = {
  constraints_maxValue?: Maybe<Scalars['Float']>;
  constraints_minValue?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  precision?: Maybe<Scalars['Float']>;
  solution: Scalars['Float'];
  stepSize?: Maybe<Scalars['Float']>;
};

export type NumericQuizItemFragmentUpdateOneWithoutQuizItemInput = {
  connect?: Maybe<NumericQuizItemFragmentWhereUniqueInput>;
  create?: Maybe<NumericQuizItemFragmentCreateWithoutQuizItemInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<NumericQuizItemFragmentUpdateWithoutQuizItemDataInput>;
  upsert?: Maybe<NumericQuizItemFragmentUpsertWithoutQuizItemInput>;
};

export type NumericQuizItemFragmentUpdateWithoutQuizItemDataInput = {
  constraints_maxValue?: Maybe<Scalars['Float']>;
  constraints_minValue?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  precision?: Maybe<Scalars['Float']>;
  solution?: Maybe<Scalars['Float']>;
  stepSize?: Maybe<Scalars['Float']>;
};

export type NumericQuizItemFragmentUpsertWithoutQuizItemInput = {
  create: NumericQuizItemFragmentCreateWithoutQuizItemInput;
  update: NumericQuizItemFragmentUpdateWithoutQuizItemDataInput;
};

export type NumericQuizItemFragmentWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type Option = {
  __typename?: 'Option';
  id: Scalars['ID'];
  isSolution: Scalars['Boolean'];
  text: Scalars['String'];
};

export type OptionCreateManyWithoutOptionsInput = {
  connect?: Maybe<Array<OptionWhereUniqueInput>>;
  create?: Maybe<
    Array<OptionCreateWithoutMultipleOptionsQuizItemFragmentInput>
  >;
};

export type OptionCreateWithoutMultipleOptionsQuizItemFragmentInput = {
  id?: Maybe<Scalars['ID']>;
  isSolution?: Maybe<Scalars['Boolean']>;
  text: Scalars['String'];
};

export type OptionScalarWhereInput = {
  AND?: Maybe<Array<OptionScalarWhereInput>>;
  id?: Maybe<StringFilter>;
  isSolution?: Maybe<BooleanFilter>;
  NOT?: Maybe<Array<OptionScalarWhereInput>>;
  OR?: Maybe<Array<OptionScalarWhereInput>>;
  text?: Maybe<StringFilter>;
};

export type OptionUpdateManyDataInput = {
  id?: Maybe<Scalars['ID']>;
  isSolution?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
};

export type OptionUpdateManyWithoutMultipleOptionsQuizItemFragmentInput = {
  connect?: Maybe<Array<OptionWhereUniqueInput>>;
  create?: Maybe<
    Array<OptionCreateWithoutMultipleOptionsQuizItemFragmentInput>
  >;
  delete?: Maybe<Array<OptionWhereUniqueInput>>;
  deleteMany?: Maybe<Array<OptionScalarWhereInput>>;
  disconnect?: Maybe<Array<OptionWhereUniqueInput>>;
  set?: Maybe<Array<OptionWhereUniqueInput>>;
  update?: Maybe<
    Array<
      OptionUpdateWithWhereUniqueWithoutMultipleOptionsQuizItemFragmentInput
    >
  >;
  updateMany?: Maybe<Array<OptionUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<
    Array<
      OptionUpsertWithWhereUniqueWithoutMultipleOptionsQuizItemFragmentInput
    >
  >;
};

export type OptionUpdateManyWithWhereNestedInput = {
  data: OptionUpdateManyDataInput;
  where: OptionScalarWhereInput;
};

export type OptionUpdateWithoutMultipleOptionsQuizItemFragmentDataInput = {
  id?: Maybe<Scalars['ID']>;
  isSolution?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
};

export type OptionUpdateWithWhereUniqueWithoutMultipleOptionsQuizItemFragmentInput = {
  data: OptionUpdateWithoutMultipleOptionsQuizItemFragmentDataInput;
  where: OptionWhereUniqueInput;
};

export type OptionUpsertWithWhereUniqueWithoutMultipleOptionsQuizItemFragmentInput = {
  create: OptionCreateWithoutMultipleOptionsQuizItemFragmentInput;
  update: OptionUpdateWithoutMultipleOptionsQuizItemFragmentDataInput;
  where: OptionWhereUniqueInput;
};

export type OptionWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  quiz?: Maybe<Quiz>;
  quizzes: Array<Quiz>;
};

export type QueryQuizArgs = {
  where: QuizWhereUniqueInput;
};

export type QueryQuizzesArgs = {
  after?: Maybe<Scalars['ID']>;
  before?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type Quiz = {
  __typename?: 'Quiz';
  author: User;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isPrivate: Scalars['Boolean'];
  items: Array<QuizItem>;
  timeLimitInMinutes?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type QuizItemsArgs = {
  after?: Maybe<Scalars['ID']>;
  before?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type QuizCreateInput = {
  author: UserCreateOneWithoutAuthorInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  items?: Maybe<QuizItemCreateManyWithoutItemsInput>;
  timeLimitInMinutes?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type QuizItem = {
  __typename?: 'QuizItem';
  fragmentMultipleOptions?: Maybe<MultipleOptionsQuizItemFragment>;
  fragmentNumeric?: Maybe<NumericQuizItemFragment>;
  id: Scalars['ID'];
  quiz: Quiz;
  stem: Scalars['String'];
  type: QuizItemType;
};

export type QuizItemCreateManyWithoutItemsInput = {
  connect?: Maybe<Array<QuizItemWhereUniqueInput>>;
  create?: Maybe<Array<QuizItemCreateWithoutQuizInput>>;
};

export type QuizItemCreateWithoutQuizInput = {
  fragmentMultipleOptions?: Maybe<
    MultipleOptionsQuizItemFragmentCreateOneWithoutFragmentMultipleOptionsInput
  >;
  fragmentNumeric?: Maybe<
    NumericQuizItemFragmentCreateOneWithoutFragmentNumericInput
  >;
  id?: Maybe<Scalars['ID']>;
  stem: Scalars['String'];
  type: QuizItemType;
};

export type QuizItemScalarWhereInput = {
  AND?: Maybe<Array<QuizItemScalarWhereInput>>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<QuizItemScalarWhereInput>>;
  OR?: Maybe<Array<QuizItemScalarWhereInput>>;
  stem?: Maybe<StringFilter>;
  type?: Maybe<QuizItemType>;
};

export enum QuizItemType {
  MultipleOptions = 'MULTIPLE_OPTIONS',
  Numeric = 'NUMERIC',
}

export type QuizItemUpdateManyDataInput = {
  id?: Maybe<Scalars['ID']>;
  stem?: Maybe<Scalars['String']>;
  type?: Maybe<QuizItemType>;
};

export type QuizItemUpdateManyWithoutQuizInput = {
  connect?: Maybe<Array<QuizItemWhereUniqueInput>>;
  create?: Maybe<Array<QuizItemCreateWithoutQuizInput>>;
  delete?: Maybe<Array<QuizItemWhereUniqueInput>>;
  deleteMany?: Maybe<Array<QuizItemScalarWhereInput>>;
  disconnect?: Maybe<Array<QuizItemWhereUniqueInput>>;
  set?: Maybe<Array<QuizItemWhereUniqueInput>>;
  update?: Maybe<Array<QuizItemUpdateWithWhereUniqueWithoutQuizInput>>;
  updateMany?: Maybe<Array<QuizItemUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<QuizItemUpsertWithWhereUniqueWithoutQuizInput>>;
};

export type QuizItemUpdateManyWithWhereNestedInput = {
  data: QuizItemUpdateManyDataInput;
  where: QuizItemScalarWhereInput;
};

export type QuizItemUpdateWithoutQuizDataInput = {
  fragmentMultipleOptions?: Maybe<
    MultipleOptionsQuizItemFragmentUpdateOneWithoutQuizItemInput
  >;
  fragmentNumeric?: Maybe<NumericQuizItemFragmentUpdateOneWithoutQuizItemInput>;
  id?: Maybe<Scalars['ID']>;
  stem?: Maybe<Scalars['String']>;
  type?: Maybe<QuizItemType>;
};

export type QuizItemUpdateWithWhereUniqueWithoutQuizInput = {
  data: QuizItemUpdateWithoutQuizDataInput;
  where: QuizItemWhereUniqueInput;
};

export type QuizItemUpsertWithWhereUniqueWithoutQuizInput = {
  create: QuizItemCreateWithoutQuizInput;
  update: QuizItemUpdateWithoutQuizDataInput;
  where: QuizItemWhereUniqueInput;
};

export type QuizItemWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type QuizUpdateInput = {
  author?: Maybe<UserUpdateOneRequiredWithoutQuizzesInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  items?: Maybe<QuizItemUpdateManyWithoutQuizInput>;
  timeLimitInMinutes?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type QuizWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type StringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  quizzes: Array<Quiz>;
};

export type UserQuizzesArgs = {
  after?: Maybe<Scalars['ID']>;
  before?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type UserCreateOneWithoutAuthorInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutQuizzesInput>;
};

export type UserCreateWithoutQuizzesInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  passwordHash: Scalars['String'];
};

export type UserUpdateOneRequiredWithoutQuizzesInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutQuizzesInput>;
  update?: Maybe<UserUpdateWithoutQuizzesDataInput>;
  upsert?: Maybe<UserUpsertWithoutQuizzesInput>;
};

export type UserUpdateWithoutQuizzesDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  passwordHash?: Maybe<Scalars['String']>;
};

export type UserUpsertWithoutQuizzesInput = {
  create: UserCreateWithoutQuizzesInput;
  update: UserUpdateWithoutQuizzesDataInput;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};
