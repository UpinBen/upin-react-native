import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../ProfileScreen';
import LoginScreen from '../LoginScreen'; 
import SignUp from '../signup/SignUp'; 



const ProfileStack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile Screen" component={ProfileScreen} />
      <ProfileStack.Screen name="Login" component={LoginScreen} />
      <ProfileStack.Screen name="SignUp" component={SignUp} /> 
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
