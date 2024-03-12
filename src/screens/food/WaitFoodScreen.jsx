import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FoodWaitCard} from '../../../components/waitCard/FoodWaitCard';
import { useSelector } from 'react-redux';

export const WaitFoodScreen = () => {
  const [allOrders, setAllOrders] = useState([]);

  const user = useSelector(state => state.user);

  useEffect(() => {
    axios.get(`http://192.168.1.8:8080/api/admin/order/${user?._id}`).then(res => {
      setAllOrders(res.data);
      console.log(res.data);
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
