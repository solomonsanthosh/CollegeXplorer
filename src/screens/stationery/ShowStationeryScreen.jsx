import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Popup} from '../../../components/utilis/PopupComponent';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { StationeryCard } from '../../../components/showPage/StationeryCard';

export const ShowStationeryScreen = () => {
  const navigation = useNavigation();
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);

  const deleteButton = id => {
    Alert.alert(
      'Delete Food',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteFood(id),
        },
      ],
      {cancelable: false},
    );
  };

  const deleteFood = async id => {
    try {
      await axios.delete(
        `http://192.168.98.28:8080/api/admin/dish/delete/${id}`,
      );
      const updatedFoods = products.filter(product => product._id !== id);
      setProducts(updatedFoods);
      console.log('Deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://192.168.98.28:8080/api/admin/dish',
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleOpenPopup = product => {
    setSelectedProduct(product);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {products?.map(product => (
          <StationeryCard
            key={product._id}
            product={product}
            handleOpenPopup={() => handleOpenPopup(product)}
            deleteButton={deleteButton}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddStationeryScreen')}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      <Popup
        visible={popupVisible}
        onClose={handleClosePopup}
        product={selectedProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    zIndex: 0,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 14,
    color: '#888',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  icon: {
    marginLeft: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
