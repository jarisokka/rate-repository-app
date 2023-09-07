import { useQuery } from '@apollo/client';
import { GET_AUTHORIZATION } from '../graphql/queries';

const useAuthorization = () => {
  const { data, error, loading } = useQuery(GET_AUTHORIZATION, { fetchPolicy: 'no-cache' }); 

  if (loading) {
    return { data: null, loading: true, error: null };
  }
  
  return { authenticatedUser: data.me, error, loading };
};

export default useAuthorization;