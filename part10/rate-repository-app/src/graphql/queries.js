import {gql} from "@apollo/client";
import {REPOSITORY_DETAILS} from "./fragments";

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_DETAILS}
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
`;
