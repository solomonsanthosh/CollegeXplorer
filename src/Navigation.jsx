import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { ShowFoodScreen } from './screens/food/ShowFoodScreen';
import { AddFoodScreen } from './screens/food/AddFoodScreen';
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { EditFoodScreen } from './screens/food/EditFoodScreen';
import Maps from './screens/attendance/Maps';
import Selfie from './screens/attendance/Selfie';
import { ShowStationeryScreen } from './screens/stationery/ShowStationeryScreen';
import { AddStationeryScreen } from './screens/stationery/AddStationeryScreen';
import { EditStationeryScreen } from './screens/stationery/EditStationeryScreen';
import { WaitFoodScreen } from './screens/food/WaitFoodScreen';
import { MapScreen } from './screens/map/MapScreen';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const user = useSelector(state => state.user);
  return (
    <NavigationContainer>
      <Text>{JSON.stringify(user)}</Text>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="LoginScreen">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ShowFoodScreen" component={ShowFoodScreen} />
        <Stack.Screen name="AddFoodScreen" component={AddFoodScreen} />
        <Stack.Screen name="EditFoodScreen" component={EditFoodScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

        {/* Food Wait Screen */}
        <Stack.Screen name="WaitFoodScreen" component={WaitFoodScreen} />

        {/* Stationery */}
        <Stack.Screen
          name="ShowStationeryScreen"
          component={ShowStationeryScreen}
        />
        <Stack.Screen
          name="AddStationeryScreen"
          component={AddStationeryScreen}
        />
        <Stack.Screen
          name="EditStationeryScreen"
          component={EditStationeryScreen}
        />

        {/* attendance */}
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="Selfie" component={Selfie} />

        <Stack.Screen name="MapScreen" component={MapScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
