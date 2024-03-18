import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/HomeScreen';
import {ShowFoodScreen} from './screens/food/ShowFoodScreen';
import {AddFoodScreen} from './screens/food/AddFoodScreen';
import {LoginScreen} from './screens/auth/LoginScreen';
import {RegisterScreen} from './screens/auth/RegisterScreen';
import {EditFoodScreen} from './screens/food/EditFoodScreen';
import Maps from './screens/attendance/Maps';
import Selfie from './screens/attendance/Selfie';
import {ShowStationeryScreen} from './screens/stationery/ShowStationeryScreen';
import {AddStationeryScreen} from './screens/stationery/AddStationeryScreen';
import {EditStationeryScreen} from './screens/stationery/EditStationeryScreen';
import {WaitFoodScreen} from './screens/food/WaitFoodScreen';
import {MapScreen} from './screens/map/MapScreen';
import {useSelector} from 'react-redux';
import AdminDashboard from './screens/superAdmin/AdminDashboard';
import { CreateStationeryShop } from './screens/superAdmin/CreateStationeryShop';
import { CreateFoodShop } from './screens/superAdmin/CreateFoodShop';
import { CreateTeacher } from './screens/superAdmin/CreateTeacher';
import TeacherSearch from './screens/teacher/TeacherSearch';
import FoodBottomNav from './navigation/FoodBottomNav';
import StationeryBottomNav from './navigation/StationeryBottomNav';
import TeacherBottomNav from './navigation/TeacherBottomNav';
import TeacherClass from './screens/teacher/TeacherClass';
import TeacherProfile from './screens/teacher/TeacherProfile';
import { WaitStationeryScreen } from './screens/stationery/WaitStationeryScreen';
import TeacherNotes from './screens/teacher/TeacherNotes';
import AddNotesTeacher from './screens/teacher/AddNotesTeacher';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const user = useSelector(state => state.user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="LoginScreen">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ShowFoodScreen" component={ShowFoodScreen} />
        <Stack.Screen name="AddFoodScreen" component={AddFoodScreen} />
        <Stack.Screen name="EditFoodScreen" component={EditFoodScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

        {/* BottomNav */}
        <Stack.Screen name="FoodBottomNav" component={FoodBottomNav} />
        <Stack.Screen name="StationeryBottomNav" component={StationeryBottomNav} />
        <Stack.Screen name="TeacherBottomNav" component={TeacherBottomNav} />

        {/* AdminDashboard */}
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="CreateStationeryShop" component={CreateStationeryShop} />
        <Stack.Screen name="CreateFoodShop" component={CreateFoodShop} />
        <Stack.Screen name="CreateTeacher" component={CreateTeacher} />

        {/* Teacher */}
        <Stack.Screen name="TeacherSearch" component={TeacherSearch} />
        <Stack.Screen name="TeacherClass" component={TeacherClass} />
        <Stack.Screen name="TeacherProfile" component={TeacherProfile} />
        <Stack.Screen name="TeacherNotes" component={TeacherNotes} />
        <Stack.Screen name="AddNotesTeacher" component={AddNotesTeacher} />

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
        <Stack.Screen
          name="WaitStationeryScreen"
          component={WaitStationeryScreen}
        />

        {/* attendance */}
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="Selfie" component={Selfie} />

        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
