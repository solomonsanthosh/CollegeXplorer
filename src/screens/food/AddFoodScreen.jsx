import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const validationSchema = yup.object().shape({
  productName: yup.string().required('Product Name is required'),
  productDescription: yup.string().required('Product Description is required'),
  shop: yup.string().required('Restaurant is required'),
  productPrice: yup.number().required('Product Price is required'),
});

export const AddFoodScreen = () => {
  const shops = [
    {label: 'Restaurant A', value: 'shopA'},
    {label: 'Restaurant B', value: 'shopB'},
    {label: 'Restaurant C', value: 'shopC'},
  ];

  const navigation = useNavigation();

  const handleAddProduct = async values => {
    console.log(values, 'values');
    try {
      await axios
        .post(`http://192.168.237.28:8080/api/admin/product/insert`, values)
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
      navigation.navigate('ShowFoodScreen');
    } catch (error) {
      console.log('Error Occured ', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          productName: '',
          productDescription: '',
          shop: '65d0795ef9dd6600a6e96012',
          productImage: '',
          productPrice: '',
          isProductAvailable: false,
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

            {/* <View>
              <Text style={styles.label}>Restaurant</Text>
              <DropDownPicker
                items={shops}
                defaultValue={values.shop}
                containerStyle={{height: 40, marginBottom: 16}}
                style={styles.dropdown}
                dropDownStyle={styles.dropdown}
                onChangeItem={item => setFieldValue('shop', item.value)}
              />
              {touched.shop && errors.shop && (
                <Text style={styles.errorText}>{errors.shop}</Text>
              )}
            </View> */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Restaurant</Text>
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
            </View>

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
              <Text style={styles.buttonText}>Add Food</Text>
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
