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
  emailLogin: yup.string().required('Email is required'),
  passwordLogin: yup.string().required('Password is required'),
});

export const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Login pressed with email:', email, 'and password:', password);
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
    console.log('Forgot Password pressed');
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          emailLogin: '',
          passwordLogin: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}>
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
              Login
            </Text>

            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={values.emailLogin}
                onChangeText={handleChange('emailLogin')}
                placeholder="Enter Email"
              />
              {touched.emailLogin && errors.emailLogin && (
                <Text style={styles.errorText}>{errors.emailLogin}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={values.passwordLogin}
                onChangeText={handleChange('passwordLogin')}
                placeholder="Enter Password"
              />
              {touched.passwordLogin && errors.passwordLogin && (
                <Text style={styles.errorText}>{errors.passwordLogin}</Text>
              )}
            </View>

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.registerLinkText}>Create an account</Text>
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
  loginButton: {
    backgroundColor: '#3498db',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#3498db',
    marginBottom: 10,
    textAlign: 'right',
  },
  registerLinkText: {
    color: '#3498db',
    margin: 10,
    textAlign: 'center',
  },
});
