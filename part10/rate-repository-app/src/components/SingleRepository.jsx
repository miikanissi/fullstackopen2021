import React from "react";
import { useParams } from "react-router-native";
import useSingleRepository from "../hooks/useSingleRepository";

import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

const SingleRepository = () => {
  const { id: repositoryId } = useParams();
  const { repository, loading, handleFetchMore } = useSingleRepository({
    repositoryId,
    first: 3,
  });

  if (loading) return <Text>Loading...</Text>;
  const reviewData = repository.reviews.edges.map(({ node }) => node);

  return (
    <RepositoryItem
      repository={repository}
      reviews={reviewData}
      handleFetchMore={handleFetchMore}
      loading={loading}
      singleView
    />
  );
};

export default SingleRepository;
