import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/food/HomeScreen';
import ResturantScreen from './screens/food/ResturantScreen';
import CartScreen from './screens/food/CartScreen';
import PreparingOrderScreen from './screens/food/PreparingOrderScreen';
import DeliveryScreen from './screens/food/DeliveryScreen';
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Resturant" component={ResturantScreen} />
        <Stack.Screen
          name="Cart"
          options={{presentation: 'modal', headerShown: false}}
          component={CartScreen}
        />
        <Stack.Screen
          name="PreparingOrder"
          options={{presentation: 'fullScreenModal', headerShown: false}}
          component={PreparingOrderScreen}
        />
        <Stack.Screen
          name="Delivery"
          options={{presentation: 'fullScreenModal', headerShown: false}}
          component={DeliveryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
