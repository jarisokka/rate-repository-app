import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginBottom: 10, 
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 10,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput style={styles.container}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text color="textSecondary" style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;