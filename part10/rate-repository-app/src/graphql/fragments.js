import {gql} from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    name
    ownerName
    fullName
    createdAt
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`;
export const USER_BASE_FIELDS = gql`
  fragment userBaseFields on User {
    username
    id
    createdAt
  }
`;

export const REVIEW_BASE_FIELDS = gql`
  fragment reviewBaseFields on Review {
    id
    text
    rating
    repository {
      fullName
    }
    repositoryId
    createdAt
    user {
      id
      username
    }
  }
`;
