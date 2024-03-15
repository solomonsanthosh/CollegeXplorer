import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

export const FoodWaitCard = ({order}) => {
  const navigation = useNavigation();
  const [processing, setProcessing] = useState(false);

  const acceptDish = () => {
    setProcessing(true);
    axios
      .post(`http://192.168.1.8:8080/api/order/update/${order._id}`, {
        user: order.user._id,
        items: order.items,
        status: 'accepted',
      })
      .then(res => {
        Alert.alert('Order Accepted');
        // Optionally, you can navigate to a different screen after accepting the order
        // navigation.navigate('AcceptedOrders');
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to accept order. Please try again later.');
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  const declineDish = () => {
    setProcessing(true);
    axios
      .post(`http://192.168.1.8:8080/api/order/update/${order._id}`, {
        user: order.user._id,
        items: order.items,
        status: 'declined',
      })
      .then(res => {
        Alert.alert('Order Rejected');
      })
      .catch(error => {
        Alert.alert(
          'Error',
          'Failed to decline order. Please try again later.',
        );
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card} onPress={() => console.log('I am pressed')}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{order.user.name}</Text>
          {order.items &&
            order.items.map((item, index) => (
              <View key={index}>
                <Text style={{color: '#000'}}>
                  {item.product.productName} - {item.quantity}
                </Text>
              </View>
            ))}
          <Text style={{color: '#1e1e1e'}}>
            {order.isOrderComplete ? 'Order Completed' : 'Order Pending'}
          </Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={[styles.icon, {backgroundColor: '#68BA6A'}]}
              onPress={acceptDish}
              disabled={processing}>
              <Text style={[styles.iconText, {color: '#fff'}]}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.icon, {backgroundColor: '#E74C3C'}]}
              onPress={declineDish}
              disabled={processing}>
              <Text style={[styles.iconText, {color: '#fff'}]}>Decline</Text>
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
    color: '#000',
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
    width: '50%',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  iconText: {
    color: '#888',
  },
});
