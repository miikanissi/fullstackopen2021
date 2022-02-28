import {useMutation} from "@apollo/client";
import {AUTHORIZE} from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, {data}] = useMutation(AUTHORIZE);
  const signIn = async ({username, password}) => {
    mutate({variables: {username, password}});
  };

  return [signIn, data];
};

export default useSignIn;
