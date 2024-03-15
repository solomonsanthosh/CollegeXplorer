import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AdminBottomNav} from './AdminBottomNav';
import {ShowFoodScreen} from '../screens/food/ShowFoodScreen';
import {WaitFoodScreen} from '../screens/food/WaitFoodScreen';

const FoodBottomNav = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator tabBar={props => <AdminBottomNav {...props} />}>
      <Tab.Screen name="Food" component={ShowFoodScreen} />
      <Tab.Screen name="Order" component={WaitFoodScreen} />
    </Tab.Navigator>
  );
};

export default FoodBottomNav;
