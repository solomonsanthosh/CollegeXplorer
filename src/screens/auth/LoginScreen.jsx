import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { loginRedux } from '../../../redux/action';

const validationSchema = yup.object().shape({
  emailLogin: yup.string().required('Email is required'),
  passwordLogin: yup.string().required('Password is required'),
});

export const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [loginType, setLoginType] = useState(false);

  useEffect(() => {
    if (user) {
      handleUserRedirect(user);
    }
  }, [user]);

  const handleUserRedirect = (user) => {
    if (user.shopType === 'food') {
      navigation.navigate('FoodBottomNav');
    } else if (user.shopType === 'stationery') {
      navigation.navigate('StationeryBottomNav');
    } else if (user.type === 'admin') {
      navigation.navigate('AdminDashboard');
    }
  };

  const handleAdminLogin = async values => {
    try {
      if (!values.emailLogin || !values.passwordLogin) {
        alert('Email and password are required');
        return;
      }

      const response = await axios.post(`https://busy-ruby-snail-boot.cyclic.app/api/adminuser/login`, {
        emailLogin: values.emailLogin,
        passwordLogin: values.passwordLogin,
      });

      console.log(response.data, 'response');
      dispatch(loginRedux(response.data));
      handleUserRedirect(response.data);
    } catch (error) {
      console.log('Error', error);
      alert('Failed to login. Please try again later.');
    }
  };

  const handleTeacherLogin = async values => {
    try {
      if (!values.emailLogin || !values.passwordLogin) {
        alert('Email and password are required');
        return;
      }

      const response = await axios.post(`https://busy-ruby-snail-boot.cyclic.app/api/teacher/login`, {
        emailLogin: values.emailLogin,
        passwordLogin: values.passwordLogin,
      });

      console.log(response.data, 'response');
      navigation.navigate("TeacherBottomNav")
      dispatch(loginRedux(response.data));
      handleUserRedirect(response.data);
    } catch (error) {
      console.log('Error', error);
      alert('Failed to login. Please try again later.');
    }
  };

  const tabs = [{ name: 'Admin Login' }, { name: 'Teacher Login' }];

  return (
    <>
      <View style={styles.containerTop}>
        {tabs.map((item, index) => {
          const isActive = index === loginType ? 'active' : '';
          return (
            <TouchableWithoutFeedback
              key={item.name}
              onPress={() => setLoginType(index)}>
              <View
                style={[
                  styles.itemTop,
                  isActive && { borderColor: '#6366f1' },
                ]}>
                <Text
                  style={[styles.textTop, isActive && { color: '#6366f1' }]}>
                  {item.name}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
      <View style={styles.container}>
        <Formik
          initialValues={{
            emailLogin: '',
            passwordLogin: '',
          }}
          validationSchema={validationSchema}
          onSubmit={loginType ? handleTeacherLogin : handleAdminLogin}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginBottom: 16,
                  textAlign: 'center',
                  color: "#1e1e1e"
                }}>
                {loginType ? 'Teacher Login' : 'Admin Login'}
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
                  secureTextEntry
                />
                {touched.passwordLogin && errors.passwordLogin && (
                  <Text style={styles.errorText}>{errors.passwordLogin}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerTop: {
    width : "100%",
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  itemTop: {
    width : "50%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#e5e7eb',
    borderBottomWidth: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  textTop: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    color : "#1e1e1e",
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
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  label: {
    marginBottom: 5,
    color : "#1e1e1e"
  },
});
