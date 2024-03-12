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
import {FoodCard} from '../../../components/showPage/FoodCard';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const ShowFoodScreen = () => {
  const navigation = useNavigation();
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const [foods, setFoods] = useState([]);

  const user = useSelector(state => state.user);

  const deleteButton = id => {
    Alert.alert(
      'Delete Food',
      'Are you sure you want to delete this food?',
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
        `http://192.168.1.8:8080/api/admin/product/delete/${id}`,
      );
      const updatedFoods = foods.filter(food => food._id !== id);
      setFoods(updatedFoods);
      console.log('Deleted successfully');
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.8:8080/api/admin/product/shop/${user._id}`,
        );
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleOpenPopup = food => {
    setSelectedFood(food);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>{JSON.stringify(user)}</Text>
        {foods?.reverse().map(product => (
          <FoodCard
            key={product._id}
            product={product}
            handleOpenPopup={() => handleOpenPopup(product)}
            deleteButton={deleteButton}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddFoodScreen')}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      <Popup
        visible={popupVisible}
        onClose={handleClosePopup}
        food={selectedFood}
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
