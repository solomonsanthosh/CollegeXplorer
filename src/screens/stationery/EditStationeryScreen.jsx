import React, {useState} from 'react';
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
import Picker from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';

const validationSchema = yup.object().shape({
  productName: yup.string().required('Product Name is required'),
  productDescription: yup.string().required('Product Description is required'),
  shop: yup.string().required('Restaurant is required'),
  productPrice: yup.number().required('Product Price is required'),
});

export const EditStationeryScreen = ({route}) => {
  const productData = route.params?.product;

  const navigation = useNavigation();

  const shops = [
    {key: 1, label: 'Restaurant A', value: 'shopA'},
    {key: 2, label: 'Restaurant B', value: 'shopB'},
    {key: 3, label: 'Restaurant C', value: 'shopC'},
  ];

  const handleAddProduct = async values => {
    try {
      await axios
        .put(
          `http://192.168.1.8:8080/api/admin/product/update/${productData._id}`,
          values,
        )
        .then(res => {
          navigation.navigate('ShowFoodScreen');
          console.log(res);
          console.log(res.data);
        });
    } catch (error) {
      console.log('Error Occured ', error);
    }
  };

  const [selectedValue, setSelectedValue] = useState(shops[0].value);

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          productName: productData?.productName,
          productDescription: productData?.productDescription,
          shop: productData?.shop._id,
          productImage: productData?.productImage,
          productPrice: productData?.productPrice || 0,
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
            <View>
              <Text style={styles.label}>Product Name</Text>
              <TextInput
                style={styles.input}
                value={values.productName}
                onChangeText={handleChange('productName')}
                placeholder="Enter dish name"
              />
              {touched.productName && errors.productName && (
                <Text style={styles.errorText}>{errors.productName}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Product Description</Text>
              <TextInput
                style={styles.input}
                value={values.productDescription}
                onChangeText={handleChange('productDescription')}
                placeholder="Enter dish description"
              />
              {touched.productDescription && errors.productDescription && (
                <Text style={styles.errorText}>{errors.productDescription}</Text>
              )}
            </View>

            {/* <View>
              <Text style={styles.label}>Restaurant</Text>
              <DropDownPicker
                items={shops}
                
                containerStyle={{height: 40, marginBottom: 16}}
                style={styles.dropdown}
                dropDownStyle={styles.dropdown}
                onChangeItem={item => setFieldValue('shop', item.value)}
              />
              {touched.shop && errors.shop && (
                <Text style={styles.errorText}>{errors.shop}</Text>
              )}
            </View> */}

            {/* <View>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                {shops.map((shop, index) => (
                  <Picker.Item
                    key={shop.key}
                    label={shop.label}
                    value={shop.value}
                  />
                ))}
              </Picker>
            </View> */}

            <View>
              <Text style={styles.label}>Product Price</Text>
              <TextInput
                style={styles.input}
                value={values.productPrice.toString()}
                onChangeText={handleChange('productPrice')}
                placeholder="Enter dish price"
                keyboardType="numeric"
              />
              {touched.productPrice && errors.productPrice && (
                <Text style={styles.errorText}>{errors.productPrice}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Product Image</Text>
              <TextInput
                style={styles.input}
                value={values.productImage}
                onChangeText={handleChange('productImage')}
                placeholder="Enter dish image"
              />
              {touched.productImage && errors.productImage && (
                <Text style={styles.errorText}>{errors.productImage}</Text>
              )}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Edit Product</Text>
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
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
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
