import { useQuery } from "@apollo/client";

import RepositoryItem from "./RepositoryItem";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const UserReviews = () => {
  const { data, loading, refetch } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews: true },
  });
  let userReviews;
  if (data?.authorizedUser) {
    userReviews = data.authorizedUser.reviews.edges.map(({ node }) => node);
  }

  return (
    <RepositoryItem reviews={userReviews} loading={loading} refetch={refetch} />
  );
};

export default UserReviews;
