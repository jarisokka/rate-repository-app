import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  }); 

  if (loading) {
    return { repositories: null, loading: true, error: null };
  }

  return { repositories: data.repositories, error, loading };
};

export default useRepositories;