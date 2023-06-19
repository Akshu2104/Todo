import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Complete from '../../containers/Complete';
import Home from '../../containers/Home';
import {Header} from '../../utils/constants/Text';
const Stack = createNativeStackNavigator();

//Main navigation stack of the application
const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={`${Header.home}`}
          component={Home}
          options={{title: `${Header.todo}`}}
        />

        <Stack.Screen
          name={`${Header.complete}`}
          component={Complete}
          options={{title: `${Header.completed_task}`}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
