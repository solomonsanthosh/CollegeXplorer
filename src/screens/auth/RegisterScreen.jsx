import {useNavigation} from '@react-navigation/native';
import { Formik } from 'formik';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  nameRegister: yup.string().required('Name is required'),
  emailRegister: yup.string().required('Email is required'),
  passwordRegister: yup.string().required('Password is required'),
  confirmPasswordRegister: yup.string().required('Confirm Password is required'),
});

export const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Implement your Register logic here
    console.log('Register pressed with email:', email, 'and password:', password);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          nameRegister : '',
          emailRegister: '',
          passwordRegister: '',
          confirmPasswordRegister : '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={styles.formContainer}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 16,
                textAlign: 'center',
              }}>
              Register
            </Text>
            
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={values.emailRegister}
                onChangeText={handleChange('emailRegister')}
                placeholder="Enter Email"
              />
              {touched.emailRegister && errors.emailRegister && (
                <Text style={styles.errorText}>{errors.emailRegister}</Text>
              )}
            </View>
            
            <View>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={values.nameRegister}
                onChangeText={handleChange('nameRegister')}
                placeholder="Enter Name"
              />
              {touched.nameRegister && errors.nameRegister && (
                <Text style={styles.errorText}>{errors.nameRegister}</Text>
              )}
            </View>
            
            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={values.passwordRegister}
                onChangeText={handleChange('passwordRegister')}
                placeholder="Enter Password"
              />
              {touched.passwordRegister && errors.passwordRegister && (
                <Text style={styles.errorText}>{errors.passwordRegister}</Text>
              )}
            </View>
            
            <View>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                value={values.confirmPasswordRegister}
                onChangeText={handleChange('confirmPasswordRegister')}
                placeholder="Enter Confirm Password"
              />
              {touched.confirmPasswordRegister && errors.confirmPasswordRegister && (
                <Text style={styles.errorText}>{errors.confirmPasswordRegister}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.loginLinkText}>Already have an account</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
  },
  registerButton: {
    backgroundColor: '#3498db',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#3498db',
    marginBottom: 10,
    textAlign: 'right',
  },
  loginLinkText: {
    color: '#3498db',
    margin: 10,
    textAlign: 'center',
  },
});
