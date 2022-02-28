import {useQuery} from "@apollo/client";

import {GET_REPOSITORIES} from "../graphql/queries";

const sortCriteriaOptions = {
  latest_repos: {orderBy: "CREATED_AT", orderDirection: "DESC"},
  highest_rated_repos: {orderBy: "RATING_AVERAGE", orderDirection: "DESC"},
  lowest_rated_repos: {orderBy: "RATING_AVERAGE", orderDirection: "ASC"},
};

const useRepositories = ({sortCriteria, filter, first}) => {
  const variables = {...sortCriteriaOptions[sortCriteria], filter, first};
  const {data, loading, fetchMore, ...result} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
