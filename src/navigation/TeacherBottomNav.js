import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AdminBottomNav} from './AdminBottomNav';
import {WaitFoodScreen} from '../screens/food/WaitFoodScreen';
import TeacherSearch from '../screens/teacher/TeacherSearch';
import TeacherClass from '../screens/teacher/TeacherClass';
import TeacherProfile from '../screens/teacher/TeacherProfile';
import TeacherNotes from '../screens/teacher/TeacherNotes';

const TeacherBottomNav = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator tabBar={props => <AdminBottomNav {...props} />}>
      <Tab.Screen name="Notes" component={TeacherNotes} />
      <Tab.Screen name="Class" component={TeacherClass} />
      <Tab.Screen name="Teacher" component={TeacherSearch} />
      <Tab.Screen name="Profile" component={TeacherProfile} />
    </Tab.Navigator>
  );
};

export default TeacherBottomNav;
