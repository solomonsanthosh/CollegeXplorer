import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const validationSchema = yup.object().shape({
  productName: yup.string().required('Product Name is required'),
  productDescription: yup.string().required('Product Description is required'),
  shop: yup.string().required('Shop is required'),
  productImage: yup.string().required('Product Image is required'),
  productType: yup.string().required('Product Type is required'),
  productPrice: yup.string().required('Product Price is required'),
});

export const AddStationeryScreen = () => {
  const shops = [
    {label: 'shop A', value: 'shopA'},
    {label: 'shop B', value: 'shopB'},
    {label: 'shop C', value: 'shopC'},
  ];

  const user = useSelector(state => state.user);

  const navigation = useNavigation();

  const handleAddProduct = async values => {
    try {
      await axios
        .post(`http://192.168.1.8:8080/api/product/insert`, values)
        .then(res => {
          Alert.alert('Success', 'Product Added Successfully', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('StationeryBottomNav'), // Navigate after pressing "OK"
            },
          ]);
        });
      // navigation.navigate('StationeryBottomNav');
    } catch (error) {
      console.log('Error Occured ', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.inputLabel, {textAlign: 'center'}]}>
        Add Stationery Product
      </Text>
      <Formik
        initialValues={{
          productName: '',
          productDescription: '',
          shop: user._id,
          productImage: '',
          productType: 'stationery',
          productPrice: '',
          isProductAvailable: true,
        }}
        validationSchema={validationSchema}
        onSubmit={handleAddProduct}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Product Name</Text>
              <TextInput
                onChangeText={handleChange('productName')}
                placeholder="Enter Dish name"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={values.productName}
              />
              {touched.productName && errors.productName && (
                <Text style={styles.errorText}>{errors.productName}</Text>
              )}
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Product Description</Text>
              <TextInput
                onChangeText={handleChange('productDescription')}
                placeholder="Enter Dish description"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={values.productDescription}
              />
              {touched.productDescription && errors.productDescription && (
                <Text style={styles.errorText}>
                  {errors.productDescription}
                </Text>
              )}
            </View>

            {/* <View style={styles.input}>
              <Text style={styles.inputLabel}>Shop</Text>
              <TextInput
                onChangeText={handleChange('shop')}
                placeholder="Enter Restaurant"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={values.shop}
                editable={false}
                selectTextOnFocus={false}
              />
              {touched.shop && errors.shop && (
                <Text style={styles.errorText}>{errors.shop}</Text>
              )}
            </View> */}

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Product Price</Text>
              <TextInput
                onChangeText={handleChange('productPrice')}
                placeholder="Enter Product Price"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={values.productPrice}
              />
              {touched.productPrice && errors.productPrice && (
                <Text style={styles.errorText}>{errors.productPrice}</Text>
              )}
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Product Image</Text>
              <TextInput
                onChangeText={handleChange('productImage')}
                placeholder="Enter Product Image"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={values.productImage}
              />
              {touched.productImage && errors.productImage && (
                <Text style={styles.errorText}>{errors.productImage}</Text>
              )}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Product</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },

  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
