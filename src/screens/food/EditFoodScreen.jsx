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

const validationSchema = yup.object().shape({
  dishName: yup.string().required('Product Name is required'),
  dishDescription: yup.string().required('Product Description is required'),
  restaurant: yup.string().required('Restaurant is required'),
  dishPrice: yup.number().required('Product Price is required'),
});

export const EditFoodScreen = ({route}) => {
  const foodData = route.params?.food;

  const restaurants = [
    {key: 1, label: 'Restaurant A', value: 'restaurantA'},
    {key: 2, label: 'Restaurant B', value: 'restaurantB'},
    {key: 3, label: 'Restaurant C', value: 'restaurantC'},
  ];

  const handleAddProduct = async values => {
    console.log(values, 'values');
    try {
      await axios
        .post(`http://192.168.1.18:8080/api/admin/dish/insert`, values)
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    } catch (error) {
      console.log('Error Occured ', error);
    }
  };

  const [selectedValue, setSelectedValue] = useState(restaurants[0].value);

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          dishName: foodData?.dishName,
          dishDescription: foodData?.dishDescription,
          restaurant: 'null',
          dishImage: foodData?.dishImage,
          dishPrice: parseInt(foodData?.dishPrice),
          isDishAvailable: false,
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
                value={values.dishName}
                onChangeText={handleChange('dishName')}
                placeholder="Enter product name"
              />
              {touched.dishName && errors.dishName && (
                <Text style={styles.errorText}>{errors.dishName}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Product Description</Text>
              <TextInput
                style={styles.input}
                value={values.dishDescription}
                onChangeText={handleChange('dishDescription')}
                placeholder="Enter product description"
              />
              {touched.dishDescription && errors.dishDescription && (
                <Text style={styles.errorText}>{errors.dishDescription}</Text>
              )}
            </View>

            {/* <View>
              <Text style={styles.label}>Restaurant</Text>
              <DropDownPicker
                items={restaurants}
                
                containerStyle={{height: 40, marginBottom: 16}}
                style={styles.dropdown}
                dropDownStyle={styles.dropdown}
                onChangeItem={item => setFieldValue('restaurant', item.value)}
              />
              {touched.restaurant && errors.restaurant && (
                <Text style={styles.errorText}>{errors.restaurant}</Text>
              )}
            </View> */}

            {/* <View>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                {restaurants.map((restaurant, index) => (
                  <Picker.Item
                    key={restaurant.key}
                    label={restaurant.label}
                    value={restaurant.value}
                  />
                ))}
              </Picker>
            </View> */}

            <View>
              <Text style={styles.label}>Product Price</Text>
              <TextInput
                style={styles.input}
                value={values.dishPrice}
                onChangeText={handleChange('dishPrice')}
                placeholder="Enter product price"
                keyboardType="numeric"
              />
              {touched.dishPrice && errors.dishPrice && (
                <Text style={styles.errorText}>{errors.dishPrice}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Product Image</Text>
              <TextInput
                style={styles.input}
                value={values.dishImage}
                onChangeText={handleChange('dishImage')}
                placeholder="Enter product image"
              />
              {touched.dishImage && errors.dishImage && (
                <Text style={styles.errorText}>{errors.dishImage}</Text>
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
