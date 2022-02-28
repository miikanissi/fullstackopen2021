import {useMutation} from "@apollo/client";

import {CREATE_REVIEW} from "../graphql/mutations";

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ownerName, repositoryName, rating, text}) => {
    const review = {
      ownerName,
      repositoryName,
      rating,
      text,
    };

    const payload = await mutate({variables: {review}});

    return payload;
  };

  return [createReview, result];
};

export default useReview;
