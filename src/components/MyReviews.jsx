import { View,StyleSheet, FlatList, Alert} from 'react-native';
import { useNavigate  } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import Button from './Button';
import { format } from 'date-fns'
import useGetUser from '../hooks/useGetUser';
import useDeleteReview from '../hooks/useDeleteReview';

const MyReviews = () => {
  const { authenticatedUser, refetch } = useGetUser();

  const styles = StyleSheet.create({
    separator: {
      height: 10,
      backgroundColor: '#e1e4e8',
    }
  });

  const ItemSeparator = () => <View style={styles.separator} />;

  if (!authenticatedUser) {
    return <Text>Loading...</Text>
  }

  const reviews = authenticatedUser.reviews.edges.map(e => e.node);

  if (reviews.length == 0) {
    return <Text>No reviews.</Text>
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (<ReviewItem reviews={item} refetch={refetch}/>)}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}  
    />
  )
}
const ReviewItem = ( { reviews, refetch } ) => {
  const navigate = useNavigate();
  const [ deleteReview ] = useDeleteReview();

  const openRepository = (id) => {
    navigate(`/${id}`);
  };

  const deletingReview = async (id) => {
    try {
      await deleteReview(id);
      await refetch();
    } catch (e) {
      console.log("Oh no, error: ",e);
    }
  };

  // This is not is use at the moment because using browser for runnign the code
  const showAlert = () =>
    Alert.alert('Delete review', 'Are you sure you want to delete this review', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'delete', onPress: () => deletingReview},
    ]);

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
    buttonContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      justifyContent: 'space-evenly',
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
    deleteButton: {
      backgroundColor: theme.colors.error,
    }
  });

  const dateInput = new Date(reviews.createdAt);
  const dateFormated = format(dateInput, 'dd.MM.yyyy');

  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <View style={styles.ratingContainer}>
          <Text color='primary' fontWeight='bold' fontSize='subheading'>{reviews.rating}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.items} fontWeight='bold'>{reviews.user.username}</Text>
          <Text style={styles.items} color='secondary'>{dateFormated}</Text>
          <Text style={styles.items}>{reviews.text}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => openRepository(reviews.repositoryId)}>View repository</Button>
        <Button onPress={() => deletingReview(reviews.id)} style={styles.deleteButton}>Delete review</Button>
      </View>
    </View>
  )
}

export default MyReviews;