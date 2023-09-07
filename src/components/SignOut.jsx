import { StyleSheet, View, Pressable } from 'react-native';
import { Formik } from 'formik';
import React, { useState } from 'react';

import Text from './Text';
import theme from '../theme';
import useSignOut from '../hooks/useSignOut';


const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 16,
    flexDirection: 'column',
  },
  input: {
    height: 60,
    marginBottom: 10, 
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  button: {
    height: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    color: 'white',
  }
});

const SignOut = () => {
  const signOut = useSignOut();
  const [redirectToHome, setRedirectToHome] = useState(false);

  const onSubmit = async () => {

    try {
      await signOut();
      setRedirectToHome(true)
    } catch (e) {
      console.log(e);
    }
  };

  if (redirectToHome) {
    return (
      <View>
        <Text>Bye bye...</Text>
      </View>
    )
  }

  const initialValues = {
    username: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <Pressable onPress={handleSubmit}>
            <Text fontWeight="bold" fontSize="subheading" style={styles.button}>Sign Out</Text>
          </Pressable>
        </View>
      )}     
    </Formik> 
  );
};

export default SignOut;