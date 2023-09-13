import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate  } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import {Picker} from '@react-native-picker/picker';
import React, { useState } from 'react';
import theme from '../theme';
import { Platform } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    height: 150,
    padding: 5,
    paddingTop: 10,
  },
  item: {
    backgroundColor: 'lightgray',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
  picker: {
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'lightgray',
    fontFamily: Platform.select({
      android: theme.fonts.android,
      ios: theme.fonts.ios,
      default: theme.fonts.main,
    }),
    fontWeight: theme.fontWeights.normal,
    fontSize: 16,
    padding: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <HeaderComponent 
        selectedOrder={props.selectedOrder} 
        setSelectedOrder={props.setSelectedOrder}
        searchQuery={props.searchQuery} 
        setSearchQuery={props.setSearchQuery}
      />
    )
  }
  render() {
    const props = this.props;
    const repositoryNodes = props.repositories
    ? props.repositories.edges.map(edge => edge.node)
    : [];

    return(
      <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (<RepositoryItemWithNavigation item={item} />)}
      ListHeaderComponent={this.renderHeader}
      />
    )
  }
}

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

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("CREATED_AT");
  const [searchQuery, setSearchQuery] = useState("");
  const { repositories } = useRepositories({selectedOrder, searchQuery});

  return <RepositoryListContainer
    repositories={repositories}
    selectedOrder={selectedOrder}
    setSelectedOrder={setSelectedOrder}
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    />;
};

const HeaderComponent = ({ selectedOrder ,setSelectedOrder, searchQuery, setSearchQuery }) => {
  const [debouncedSearch] = useDebounce(query => setSearchQuery(query), 500);
  const onChangeSearch = (query) => {debouncedSearch(query);};

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{backgroundColor: 'white'}}
        />
      </View>
      <View style={styles.item}>
        <Picker
        style={styles.picker}
        selectedValue={selectedOrder}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedOrder(itemValue)
        }>
        <Picker.Item label="Select an item..." value="" enabled={false} />
        <Picker.Item label="Latest repositories" value="CREATED_AT" />
        <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE,DESC" />
        <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE,ASC" />
      </Picker>
      </View>
    </View>
  )
}

export default RepositoryList;