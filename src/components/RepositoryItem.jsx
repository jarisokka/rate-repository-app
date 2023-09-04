import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const RepositoryItem = ({ item }) => {

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flexGrow: 1,
      padding: 5,
      backgroundColor: 'white' 
    }
  });

  return (
    <View style={styles.container}>
      <Profile
        ownerAvatarUrl={item.ownerAvatarUrl}
        fullName={item.fullName}
        description={item.description}
        language={item.language}
        />
      <Stats item={item}/>
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
        <Text fontWeight="bold" fontSize="subheading">{fullName}</Text>
        <Text color="textSecondary">{description}</Text>
        <Text style={styles.languageContainer}>{language}</Text>        
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
        <FormatInput text="Stars" value={item.stargazersCount}/>
        <FormatInput text="Forks" value={item.forksCount}/>
        <FormatInput text="Reviews" value={item.reviewCount}/>
        <FormatInput text="Rating" value={item.ratingAverage}/>  
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