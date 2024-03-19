import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {StationeryCard} from '../../../components/showPage/StationeryCard';
import {PopupStationery} from '../../../components/utilis/PopupStationery';
import {useSelector} from 'react-redux';

export const ShowStationeryScreen = () => {
  const navigation = useNavigation();
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const user = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);

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
      await axios.delete(`https://busy-ruby-snail-boot.cyclic.app/api/product/delete/${id}`);
      const updatedFoods = products.filter(product => product?._id !== id);
      setProducts(updatedFoods);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const fetchData = async () => {
    
  };

  useEffect(async () => {
    if (user) {
      try {
        const response = await axios.get(
          `https://busy-ruby-snail-boot.cyclic.app/api/product/shop/${user?._id}`,
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

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
        {loading ? (
          <Text style={{color : "#1e1e1e"}}>Loading...</Text>
        ) : (
          <>
            {products?.reverse().map(product => (
              <StationeryCard
                key={product._id}
                product={product}
                handleOpenPopup={() => handleOpenPopup(product)}
                deleteButton={deleteButton}
              />
            ))}
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddStationeryScreen', { setProducts })}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      <PopupStationery
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
