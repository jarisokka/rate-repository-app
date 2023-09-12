import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER, { fetchPolicy: 'no-cache' });

  const signUp = async ({ username, password }) => {
    const newUser = await mutate({ variables: { username, password } });
    return newUser; 
  };

  return [signUp, result];
};

export default useSignUp;