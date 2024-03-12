import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FoodWaitCard} from '../../../components/waitCard/FoodWaitCard';

export const WaitFoodScreen = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://192.168.237.28:8080/api/admin/order`).then(res => {
      setAllOrders(res.data);
    });
  }, []);

  return (
    <View style={styles.cardContainer}>
      {allOrders &&
        allOrders.map((order, index) => (
          <FoodWaitCard key={index} order={order} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
  },
});
