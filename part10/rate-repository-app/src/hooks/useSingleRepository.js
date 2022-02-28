import {useQuery} from "@apollo/client";

import {GET_REPOSITORY} from "../graphql/queries";

const useSingleRepository = ({repositoryId, first}) => {
  const variables = {id: repositoryId, first};
  const {data, loading, fetchMore, ...result} = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data ? data.repository : undefined,
    handleFetchMore,
    loading,
    ...result,
  };
};

export default useSingleRepository;
