import {useMutation} from "@apollo/client";
import {SIGN_UP} from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({username, password}) => {
    const user = {username, password};
    const payload = await mutate({variables: {user}});
    return payload;
  };

  return [signUp, result];
};

export default useSignUp;
