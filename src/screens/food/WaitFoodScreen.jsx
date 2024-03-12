import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FoodWaitCard} from '../../../components/waitCard/FoodWaitCard';
import { useSelector } from 'react-redux';

export const WaitFoodScreen = () => {
  const user = useSelector(state => state.user);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    if(user) {
      axios.get(`http://192.168.1.8:8080/api/order/${user?._id}`).then(res => {
        setAllOrders(res.data);
      });
    }
  }, [user]);


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
