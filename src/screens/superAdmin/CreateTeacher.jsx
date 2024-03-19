import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  // name: '',
  //           email: '',
  //           password: '',
  //           confirmPassword: '',
  //           className: '',
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  className: yup.string().required('Class Name is required'),
});

export const CreateTeacher = () => {
  const navigation = useNavigation();

  const handleCreateTeacher = values => {
    if (values.password !== values.confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    try {
      axios
        .post(`https://busy-ruby-snail-boot.cyclic.app/api/teacher/insert`, values)
        .then(() => {
          Alert.alert('Success', 'Teacher Created Successfully', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('AdminDashboard'),
            },
          ]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingVertical: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            className: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreateTeacher}>
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
                  color: '#1e1e1e',
                }}>
                Create a Teacher
              </Text>

              {/* Name field */}
              <View>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder="Enter Name"
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              {/* Email field */}
              <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Enter Email"
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Class Name field */}
              <View>
                <Text style={styles.label}>Class Name</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.className}
                  onChangeText={handleChange('className')}
                  placeholder="Enter Class Name"
                />
                {touched.className && errors.className && (
                  <Text style={styles.errorText}>{errors.className}</Text>
                )}
              </View>

              {/* Password field */}
              <View>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Enter Password"
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              {/* Confirm Password field */}
              <View>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  placeholder="Confirm Password"
                  secureTextEntry
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleSubmit}>
                <Text style={styles.registerButtonText}>Create Teacher</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  registerButton: {
    backgroundColor: '#3498db',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
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
  label: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
});
