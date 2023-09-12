import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate  } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({repositories}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItemWithNavigation item={item} />         
      )}
    />
  );
};

const RepositoryItemWithNavigation = ({ item }) => {
  const navigate = useNavigate();

  const handleSubmit = (id) => {
    navigate(`/${id}`);
  };

  return (
    <Pressable onPress={() => handleSubmit(item.id)}>
      <RepositoryItem item={item} />
    </Pressable>
  );
};

// this implementation for testing
const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;