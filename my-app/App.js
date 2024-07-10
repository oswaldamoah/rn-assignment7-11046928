// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import CartScreen from './CartScreen';
import Menu from './Menu';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <Menu {...props} />}
        screenOptions={{ headerShown: false }} // Ensure no default headers are shown
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="CartScreen" component={CartScreen} />
        {/* Add other screens here */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
