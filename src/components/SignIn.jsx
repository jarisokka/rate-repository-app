import { StyleSheet, View, Pressable } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 20,
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

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" style={styles.input}/>
          <FormikTextInput name="password" placeholder="Password" style={styles.input} secureTextEntry/>
          <Pressable onPress={handleSubmit}>
            <Text fontWeight="bold" fontSize="subheading" style={styles.button}>Sign in</Text>
          </Pressable>
        </View>
      )}     
    </Formik> 
  );
};

const onSubmit = (values) => {
  console.log(values);
};

export default SignIn;