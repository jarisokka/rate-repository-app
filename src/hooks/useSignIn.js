import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';

import { useAuthStorage } from '../hooks/useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE, { fetchPolicy: 'no-cache' });

  const signIn = async ({ username, password }) => {
    //const authStorage = useAuthStorage();
    const authorize = await mutate({ variables: { username, password } });
    return authorize;
    
  };

  return [signIn, result];
};

export default useSignIn;