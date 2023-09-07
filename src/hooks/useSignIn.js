import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';

//import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  //const authStorage = useAuthStorage();
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE, { fetchPolicy: 'no-cache' });

  const signIn = async ({ username, password }) => {
    const authorize = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(authorize.data.authenticate.accessToken);
    apolloClient.resetStore();
    return authorize;
    
  };

  return [signIn, result];
};

export default useSignIn;