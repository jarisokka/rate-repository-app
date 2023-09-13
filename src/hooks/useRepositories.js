import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ selectedOrder, searchQuery }) => {
  const parts = selectedOrder.split(',');
  const orderBy = parts[0];
  const orderDirection = parts[1] || undefined;

  const { data, error, loading } = useQuery(GET_REPOSITORIES, { variables: { orderBy: orderBy, orderDirection: orderDirection, searchKeyword: searchQuery },
    fetchPolicy: 'cache-and-network',
  }); 

  if (loading) {
    return { repositories: null, loading: true, error: null };
  }

  return { repositories: data.repositories, error, loading };
};

export default useRepositories;