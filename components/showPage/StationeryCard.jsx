import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export const StationeryCard = ({food, handleOpenPopup, deleteButton}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  console.log(food);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card} onPress={() => console.log('I am pressed')}>
        <Image source={{uri: food?.dishImage}} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{food?.dishName}</Text>
          <Text style={styles.cardPrice}>${food?.dishPrice}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleOpenPopup(food)}>
              <Text style={styles.iconText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() =>
                navigation.navigate('EditFoodScreen', {food: food})
              }>
              <Text style={styles.iconText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              // onPress={() => setModalVisible(true)}
              onPress={() => deleteButton(food._id)}>
              <Text style={styles.iconText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: 'black',
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
  iconText: {
    color: '#888',
  },
});
