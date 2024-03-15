import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AdminBottomNav} from './AdminBottomNav';
import { ShowStationeryScreen } from '../screens/stationery/ShowStationeryScreen';
import { WaitStationeryScreen } from '../screens/stationery/WaitStationeryScreen';

const StationeryBottomNav = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator tabBar={props => <AdminBottomNav {...props} />}>
      <Tab.Screen name="Stationery" component={ShowStationeryScreen} />
      <Tab.Screen name="Order" component={WaitStationeryScreen} />
    </Tab.Navigator>
  );
};

export default StationeryBottomNav;
