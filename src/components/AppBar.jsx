import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import useAuthorization from '../hooks/useAthorization';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    paddingRight: 15,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const AppBar = () => {
  const { authenticatedUser } = useAuthorization();

  return (
  <View style={styles.container}>
    <ScrollView horizontal style={styles.scrollView}>
      <Pressable style={styles.textContainer}>
        <Link to={"/"}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
      </Pressable>
      
      {!authenticatedUser ?
        <Pressable style={styles.textContainer}> 
          <Link to={"/sign-in"}>
            <Text style={styles.text}>Sign In</Text>
          </Link>
        </Pressable> :
        <Pressable style={styles.textContainer}>
            <Link to={"/sign-out"}>
              <Text style={styles.text}>Sign Out</Text>
            </Link>
        </Pressable> }
    </ScrollView>
  </View>
  );
};

export default AppBar;