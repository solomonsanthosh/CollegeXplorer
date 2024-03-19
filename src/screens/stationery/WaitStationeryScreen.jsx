import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { FoodWaitCard } from '../../../components/waitCard/FoodWaitCard';
import { useSelector } from 'react-redux';

export const WaitStationeryScreen = () => {
  const user = useSelector(state => state.user);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get(`https://busy-ruby-snail-boot.cyclic.app/api/order/${user?._id}`)
        .then(res => {
          setAllOrders(res.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{color : "#1e1e1e"}}>An error occurred: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      {allOrders.length > 0 ? (
        allOrders.map((order) => (
          <FoodWaitCard key={order._id} order={order} />
        ))
      ) : (
        <Text style={{color : "#1e1e1e"}}>No orders found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardContainer: {
    padding: 10,
  },
});
