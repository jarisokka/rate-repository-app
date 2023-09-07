import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories{
      edges {
        node {
          id
          fullName
          description
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          ownerAvatarUrl
          language
        }
      }
    }
  }
`;

export const GET_AUTHORIZATION = gql`
  query {
    me {
      id
      username
    }
  }
`;
// other queries...
