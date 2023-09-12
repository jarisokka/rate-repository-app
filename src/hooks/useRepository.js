import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (repositoryId) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, { variables: { repositoryId }, 
    fetchPolicy: 'cache-and-network',
  }); 
  
  if (loading) {
    return { repository: null, error: null, loading: true };
  }

  if (error) {
    return { repository: null, error, loading: false };
  }

  return { repository: data?.repository, error: null, loading: false };
};

export default useRepository;