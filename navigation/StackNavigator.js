import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../components/Screens/LoginScreen';
import SignUp from '../components/signup/SignUp';

const Stack = createStackNavigator();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} // Hide header for Login screen
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp} 
        options={{ headerShown: false }} // Hide header for SignUp screen
      />
    </Stack.Navigator>
  );
}
