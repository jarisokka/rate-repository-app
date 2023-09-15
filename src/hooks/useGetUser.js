import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useGetUser = () => {
  const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'no-cache' });

  if (loading) {
    return { data: null, loading: true, error: null, refetch: null };
  }

  return { authenticatedUser: data.me, error, loading, refetch };
};

export default useGetUser;