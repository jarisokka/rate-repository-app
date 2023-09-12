import { View, Image, StyleSheet, FlatList } from 'react-native';
import Text from './Text';
import theme from '../theme';
import useRepository from '../hooks/useRepository';
import Button from './Button';
import { useParams } from 'react-router-native'
import * as Linking from 'expo-linking';
import { format } from 'date-fns'

const RepositoryItem = ({ item, button }) => {
  const params = useParams();
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flexGrow: 1,
      padding: 15,
      backgroundColor: 'white', 
    }
  });
 
  if (!item) {
    const { repository, loading } = useRepository(params.id);
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    if (!repository) {
      return <Text>Profile not found</Text>;
    }

    item = repository;
    return SingleView(item);
  }

  const openRepo = (url) => {
    Linking.openURL(url);
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
      <Profile
        ownerAvatarUrl={item.ownerAvatarUrl}
        fullName={item.fullName}
        description={item.description}
        language={item.language}
        />
      <Stats item={item}/>
      {button ? <Button onPress={() => openRepo(item.url)}>Open in GitHub</Button> : <></>}   
    </View>
  )
}

const SingleView = (item) => {
  
  const styles = StyleSheet.create({
    separator: {
      height: 10,
      backgroundColor: '#e1e4e8',
    }
  });

  const ItemSeparator = () => <View style={styles.separator} />;

  const reviews = item.reviews.edges.map(e => e.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (<ReviewItem reviews={item} />)}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryItem item={item} button={true} />}
    />
  )
}

const ReviewItem = (reviews) => {

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flexGrow: 1,
      padding: 15,
      backgroundColor: 'white', 
    },
    containerRow: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    ratingContainer: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      padding: 5,
      marginRight: 10,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemContainer: {
      flexShrink: 1,
    },
    items: {
      marginBottom: 10,
    },
  });

  const dateInput = new Date(reviews.reviews.createdAt);
  const dateFormated = format(dateInput, 'dd.MM.yyyy');

  return (
    <View style={styles.container}>
    <View style={styles.containerRow}>
      <View style={styles.ratingContainer}>
        <Text color='primary' fontWeight='bold' fontSize='subheading'>{reviews.reviews.rating}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.items} fontWeight='bold'>{reviews.reviews.user.username}</Text>
        <Text style={styles.items} color='secondary'>{dateFormated}</Text>
        <Text style={styles.items}>{reviews.reviews.text}</Text>
      </View>
    </View>
    </View>
  )
}

const Profile = ({ ownerAvatarUrl, fullName, description, language }) => {

  const styles = StyleSheet.create({
    containerRow: {
      flexDirection: 'row'
    },
    profileContainer: {
      flexGrow: 0,
      padding: 5,
      marginRight: 10,
    },
    profile: {
      width: 50,
      height: 50,
      borderRadius: 5,
    },
    detailsContainer: {
      flexShrink: 1,
      padding: 4,
    },
    languageContainer: {
      marginTop: 10,
      marginBottom: 10,
      padding: 6,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
      color: 'white',
      alignSelf: 'flex-start',
    }  
  }); 
  return (
    <>
    <View style={styles.containerRow}>
      <View style={styles.profileContainer}>
        <Image style={styles.profile} source={{uri: ownerAvatarUrl}}></Image>
      </View>
      <View style={styles.detailsContainer}>
        <Text testID="fullName" fontWeight="bold" fontSize="subheading">{fullName}</Text>
        <Text testID="description" color="textSecondary">{description}</Text>
        <Text testID="language" style={styles.languageContainer}>{language}</Text>        
      </View>
    </View>
    </>
  )
}

const Stats = ({ item }) => {
  const styles = StyleSheet.create({
    containerRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingTop: 5,
      paddingBottom: 10,
    }
  });

  return (
    <>
      <View style={styles.containerRow}>
        <FormatInput testID="stargazersCount" text="Stars" value={item.stargazersCount}/>
        <FormatInput testID="forksCount" text="Forks" value={item.forksCount}/>
        <FormatInput testID="reviewCount" text="Reviews" value={item.reviewCount}/>
        <FormatInput testID="ratingAverage" text="Rating" value={item.ratingAverage}/>  
      </View>
    </>
  )
}

const FormatInput = ({ text, value }) => {
  const styles = StyleSheet.create({
    containerText: {
      textAlign: 'center',
      paddingBottom: 4,
    }
  });
  
  const formattedValue = value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;

  return (
    <>
      <View>
        <Text fontWeight="bold" style={styles.containerText}>{formattedValue}</Text>
        <Text style={styles.containerText} color="textSecondary">{text}</Text>      
      </View>
    </>
  )
}

export default RepositoryItem;