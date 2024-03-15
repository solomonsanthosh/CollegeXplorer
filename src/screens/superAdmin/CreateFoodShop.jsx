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
} from 'react-native';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  adminName: yup.string().required('Name is required'),
  adminEmail: yup.string().required('Email is required'),
  shopName: yup.string().required('Shop Name is required'),
  shopDescription: yup.string().required('Shop Description is required'),
  shopLoc: yup.string().required('Shop Location is required'),
  shopImage: yup.string().required('Shop Image is required'),
  shopType: yup.string().required('Shop Type is required'),
  adminPassword: yup.string().required('Password is required'),
  adminConfirmPassword: yup.string().required('Confirm Password is required'),
});

export const CreateFoodShop = () => {
  const navigation = useNavigation();

  const handleRegister = values => {
    axios.post(`http://192.168.1.8:8080/api/adminuser/create`, values, () => {
      alert('Admin User Created Successfully');
      navigation.navigate('AdminDashboard');
    });
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
            adminName: '',
            adminEmail: '',
            shopName: '',
            shopDescription: '',
            shopLoc: '',
            shopImage: '',
            shopType: 'food',
            adminPassword: '',
            adminConfirmPassword: '',
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
                  color: '#1e1e1e',
                }}>
                Create Food Shop
              </Text>

              {/* Name field */}
              <View>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.adminName}
                  onChangeText={handleChange('adminName')}
                  placeholder="Enter Name"
                />
                {touched.adminName && errors.adminName && (
                  <Text style={styles.errorText}>{errors.adminName}</Text>
                )}
              </View>

              {/* Email Field */}
              <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.adminEmail}
                  onChangeText={handleChange('adminEmail')}
                  placeholder="Enter Email"
                />
                {touched.adminEmail && errors.adminEmail && (
                  <Text style={styles.errorText}>{errors.adminEmail}</Text>
                )}
              </View>

              {/* Shop Name Field */}
              <View>
                <Text style={styles.label}>Shop Name</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.shopName}
                  onChangeText={handleChange('shopName')}
                  placeholder="Enter Shop Name"
                />
                {touched.shopName && errors.shopName && (
                  <Text style={styles.errorText}>{errors.shopName}</Text>
                )}
              </View>

              {/* Shop Description Field */}
              <View>
                <Text style={styles.label}>Shop Description</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.shopDescription}
                  onChangeText={handleChange('shopDescription')}
                  placeholder="Enter Shop Description"
                />
                {touched.shopDescription && errors.shopDescription && (
                  <Text style={styles.errorText}>{errors.shopDescription}</Text>
                )}
              </View>

              {/* Shop Location Field */}
              <View>
                <Text style={styles.label}>Shop Location</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.shopLoc}
                  onChangeText={handleChange('shopLoc')}
                  placeholder="Enter Shop Location"
                />
                {touched.shopLoc && errors.shopLoc && (
                  <Text style={styles.errorText}>{errors.shopLoc}</Text>
                )}
              </View>

              {/* Shop Image  Field */}
              <View>
                <Text style={styles.label}>Shop Image</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.shopImage}
                  onChangeText={handleChange('shopImage')}
                  placeholder="Enter Shop Image"
                />
                {touched.shopImage && errors.shopImage && (
                  <Text style={styles.errorText}>{errors.shopImage}</Text>
                )}
              </View>

              {/* Shop Type Field */}
              <View>
                <Text style={styles.label}>Shop Type</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.shopType}
                  onChangeText={handleChange('shopType')}
                  placeholder="Enter Shop Type"
                />
                {touched.shopType && errors.shopType && (
                  <Text style={styles.errorText}>{errors.shopType}</Text>
                )}
              </View>

              {/* Password Field */}
              <View>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.adminPassword}
                  onChangeText={handleChange('adminPassword')}
                  placeholder="Enter Password"
                />
                {touched.adminPassword && errors.adminPassword && (
                  <Text style={styles.errorText}>{errors.adminPassword}</Text>
                )}
              </View>

              {/* Confirm Password Field */}
              <View>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  placeholderTextColor="#8d8c8c"
                  style={styles.input}
                  value={values.adminConfirmPassword}
                  onChangeText={handleChange('adminConfirmPassword')}
                  placeholder="Enter Confirm Password"
                />
                {touched.adminConfirmPassword &&
                  errors.adminConfirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.adminConfirmPassword}
                    </Text>
                  )}
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleSubmit}>
                <Text style={styles.registerButtonText}>Sign up</Text>
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
    marginTop: 10,
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
