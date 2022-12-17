/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePAssword: PersonResponse;
  createDescription: Post;
  deletePost: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: PersonResponse;
  logout: Scalars['Boolean'];
  register: PersonResponse;
  updateAvatar: Profiles;
  updatePost?: Maybe<Post>;
  updateProfile: Profiles;
  vote: Scalars['Boolean'];
};


export type MutationChangePAsswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateDescriptionArgs = {
  description: Scalars['String'];
  filename: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernameOrEmail;
  password: Scalars['String'];
};


export type MutationUpdateAvatarArgs = {
  avatarUrl: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  description?: InputMaybe<Scalars['String']>;
  filename?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationUpdateProfileArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationVoteArgs = {
  postId: Scalars['Int'];
  value: Scalars['Int'];
};

export type PersonResponse = {
  __typename?: 'PersonResponse';
  errors?: Maybe<Array<FieldError>>;
  persons?: Maybe<Profiles>;
};

export type Post = {
  __typename?: 'Post';
  creator: Profiles;
  creatorId: Scalars['Float'];
  description: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['Float'];
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type Profiles = {
  __typename?: 'Profiles';
  avatarUrl?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['Int'];
  posts?: Maybe<Array<Post>>;
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: AllPosts;
  me?: Maybe<Profiles>;
  mypost?: Maybe<Profiles>;
  singlePost?: Maybe<Post>;
};


export type QuerySinglePostArgs = {
  id: Scalars['Int'];
};

export type UsernameOrEmail = {
  email: Scalars['String'];
  username: Scalars['String'];
};

export type AllPosts = {
  __typename?: 'allPosts';
  posts: Array<Post>;
};

export type CreateDescriptionMutationVariables = Exact<{
  description: Scalars['String'];
  filename: Scalars['String'];
}>;


export type CreateDescriptionMutation = { __typename?: 'Mutation', createDescription: { __typename?: 'Post', id: number, creatorId: number, points: number, description: string, filename: string, voteStatus?: number | null } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'PersonResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, persons?: { __typename?: 'Profiles', id: number, username: string, email: string, avatarUrl?: string | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  password: Scalars['String'];
  options: UsernameOrEmail;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'PersonResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, persons?: { __typename?: 'Profiles', id: number, username: string, email: string, avatarUrl?: string | null } | null } };

export type ChangePAsswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePAsswordMutation = { __typename?: 'Mutation', changePAssword: { __typename?: 'PersonResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, persons?: { __typename?: 'Profiles', id: number, username: string, email: string, avatarUrl?: string | null } | null } };

export type UpdatePostMutationVariables = Exact<{
  description?: InputMaybe<Scalars['String']>;
  filename?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', id: number, description: string, filename: string } | null };

export type UpdateProfileMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profiles', id: number, username: string, email: string } };

export type UpdateAvatarMutationVariables = Exact<{
  avatarUrl: Scalars['String'];
}>;


export type UpdateAvatarMutation = { __typename?: 'Mutation', updateAvatar: { __typename?: 'Profiles', id: number, avatarUrl?: string | null } };

export type VoteMutationVariables = Exact<{
  postId: Scalars['Int'];
  value: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: boolean };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: { __typename?: 'allPosts', posts: Array<{ __typename?: 'Post', id: number, creatorId: number, points: number, description: string, filename: string, voteStatus?: number | null, creator: { __typename?: 'Profiles', id: number, email: string, username: string } }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Profiles', id: number, email: string, avatarUrl?: string | null, username: string } | null };

export type MyPostQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPostQuery = { __typename?: 'Query', mypost?: { __typename?: 'Profiles', id: number, posts?: Array<{ __typename?: 'Post', id: number, filename: string, description: string }> | null } | null };

export type SinglePostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SinglePostQuery = { __typename?: 'Query', singlePost?: { __typename?: 'Post', id: number, creatorId: number, filename: string, points: number, description: string, voteStatus?: number | null, creator: { __typename?: 'Profiles', id: number, username: string } } | null };


export const CreateDescriptionDocument = gql`
    mutation CreateDescription($description: String!, $filename: String!) {
  createDescription(description: $description, filename: $filename) {
    id
    creatorId
    points
    description
    filename
    voteStatus
  }
}
    `;
export type CreateDescriptionMutationFn = Apollo.MutationFunction<CreateDescriptionMutation, CreateDescriptionMutationVariables>;

/**
 * __useCreateDescriptionMutation__
 *
 * To run a mutation, you first call `useCreateDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDescriptionMutation, { data, loading, error }] = useCreateDescriptionMutation({
 *   variables: {
 *      description: // value for 'description'
 *      filename: // value for 'filename'
 *   },
 * });
 */
export function useCreateDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateDescriptionMutation, CreateDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDescriptionMutation, CreateDescriptionMutationVariables>(CreateDescriptionDocument, options);
      }
export type CreateDescriptionMutationHookResult = ReturnType<typeof useCreateDescriptionMutation>;
export type CreateDescriptionMutationResult = Apollo.MutationResult<CreateDescriptionMutation>;
export type CreateDescriptionMutationOptions = Apollo.BaseMutationOptions<CreateDescriptionMutation, CreateDescriptionMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $usernameOrEmail: String!) {
  login(password: $password, usernameOrEmail: $usernameOrEmail) {
    errors {
      field
      message
    }
    persons {
      id
      username
      email
      avatarUrl
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($password: String!, $options: UsernameOrEmail!) {
  register(options: $options, password: $password) {
    errors {
      field
      message
    }
    persons {
      id
      username
      email
      avatarUrl
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      password: // value for 'password'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ChangePAsswordDocument = gql`
    mutation ChangePAssword($newPassword: String!, $token: String!) {
  changePAssword(newPassword: $newPassword, token: $token) {
    errors {
      field
      message
    }
    persons {
      id
      username
      email
      avatarUrl
    }
  }
}
    `;
export type ChangePAsswordMutationFn = Apollo.MutationFunction<ChangePAsswordMutation, ChangePAsswordMutationVariables>;

/**
 * __useChangePAsswordMutation__
 *
 * To run a mutation, you first call `useChangePAsswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePAsswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePAsswordMutation, { data, loading, error }] = useChangePAsswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePAsswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePAsswordMutation, ChangePAsswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePAsswordMutation, ChangePAsswordMutationVariables>(ChangePAsswordDocument, options);
      }
export type ChangePAsswordMutationHookResult = ReturnType<typeof useChangePAsswordMutation>;
export type ChangePAsswordMutationResult = Apollo.MutationResult<ChangePAsswordMutation>;
export type ChangePAsswordMutationOptions = Apollo.BaseMutationOptions<ChangePAsswordMutation, ChangePAsswordMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($description: String, $filename: String, $id: Int!) {
  updatePost(description: $description, filename: $filename, id: $id) {
    id
    description
    filename
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      description: // value for 'description'
 *      filename: // value for 'filename'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($email: String!, $username: String!) {
  updateProfile(email: $email, username: $username) {
    id
    username
    email
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateAvatarDocument = gql`
    mutation UpdateAvatar($avatarUrl: String!) {
  updateAvatar(avatarUrl: $avatarUrl) {
    id
    avatarUrl
  }
}
    `;
export type UpdateAvatarMutationFn = Apollo.MutationFunction<UpdateAvatarMutation, UpdateAvatarMutationVariables>;

/**
 * __useUpdateAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvatarMutation, { data, loading, error }] = useUpdateAvatarMutation({
 *   variables: {
 *      avatarUrl: // value for 'avatarUrl'
 *   },
 * });
 */
export function useUpdateAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAvatarMutation, UpdateAvatarMutationVariables>(UpdateAvatarDocument, options);
      }
export type UpdateAvatarMutationHookResult = ReturnType<typeof useUpdateAvatarMutation>;
export type UpdateAvatarMutationResult = Apollo.MutationResult<UpdateAvatarMutation>;
export type UpdateAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($postId: Int!, $value: Int!) {
  vote(postId: $postId, value: $value)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const HelloDocument = gql`
    query Hello {
  hello {
    posts {
      id
      creatorId
      creator {
        id
        email
        username
      }
      points
      description
      filename
      voteStatus
    }
  }
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    avatarUrl
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyPostDocument = gql`
    query MyPost {
  mypost {
    id
    posts {
      id
      filename
      description
    }
  }
}
    `;

/**
 * __useMyPostQuery__
 *
 * To run a query within a React component, call `useMyPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPostQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPostQuery(baseOptions?: Apollo.QueryHookOptions<MyPostQuery, MyPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyPostQuery, MyPostQueryVariables>(MyPostDocument, options);
      }
export function useMyPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPostQuery, MyPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyPostQuery, MyPostQueryVariables>(MyPostDocument, options);
        }
export type MyPostQueryHookResult = ReturnType<typeof useMyPostQuery>;
export type MyPostLazyQueryHookResult = ReturnType<typeof useMyPostLazyQuery>;
export type MyPostQueryResult = Apollo.QueryResult<MyPostQuery, MyPostQueryVariables>;
export const SinglePostDocument = gql`
    query SinglePost($id: Int!) {
  singlePost(id: $id) {
    id
    creatorId
    creator {
      id
      username
    }
    filename
    points
    description
    voteStatus
  }
}
    `;

/**
 * __useSinglePostQuery__
 *
 * To run a query within a React component, call `useSinglePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useSinglePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSinglePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSinglePostQuery(baseOptions: Apollo.QueryHookOptions<SinglePostQuery, SinglePostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SinglePostQuery, SinglePostQueryVariables>(SinglePostDocument, options);
      }
export function useSinglePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SinglePostQuery, SinglePostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SinglePostQuery, SinglePostQueryVariables>(SinglePostDocument, options);
        }
export type SinglePostQueryHookResult = ReturnType<typeof useSinglePostQuery>;
export type SinglePostLazyQueryHookResult = ReturnType<typeof useSinglePostLazyQuery>;
export type SinglePostQueryResult = Apollo.QueryResult<SinglePostQuery, SinglePostQueryVariables>;