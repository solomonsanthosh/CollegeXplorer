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
  shop: yup.string().required('Restaurant is required'),
  productPrice: yup.number().required('Product Price is required'),
});

export const EditFoodScreen = ({route}) => {
  const productData = route.params?.product;
  const navigation = useNavigation();
  const user = useSelector(state => state.user);

  const handleEditProduct = async values => {
    console.log('Values', values);
    console.log(productData._id);
    try {
      await axios
        .put(`https://busy-ruby-snail-boot.cyclic.app/api/product/update/${productData._id}`, values)
        .then(res => {
          Alert.alert('Success', 'Product Updated Successfully', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('FoodBottomNav'),
            },
          ]);
        });
    } catch (error) {
      console.log('Error Occured ', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          productName: productData?.productName,
          productDescription: productData?.productDescription,
          shop: user._id,
          productImage: productData?.productImage,
          productType: 'food',
          productPrice: productData?.productPrice,
          isProductAvailable: productData?.isProductAvailable,
        }}
        validationSchema={validationSchema}
        onSubmit={handleEditProduct}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View>
            <Text style={[styles.inputLabel, {textAlign: 'center'}]}>
              Edit Food Product
            </Text>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Food Name</Text>
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
              <Text style={styles.inputLabel}>Food Description</Text>
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

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Food Price</Text>
              <TextInput
                onChangeText={handleChange('productPrice')}
                placeholder="Enter Product Price"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={values.productPrice.toString()}
              />
              {touched.productPrice && errors.productPrice && (
                <Text style={styles.errorText}>{errors.productPrice}</Text>
              )}
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Food Image</Text>
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
              <Text style={styles.buttonText}>Edit Food</Text>
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
