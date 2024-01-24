import {
  View,
  Text,
  Pressable,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {AddFoodScreen} from './food/AddFoodScreen';
import {ShowFoodScreen} from './food/ShowFoodScreen';

export const HomeScreen = () => {
  return <ShowFoodScreen/>;
};
