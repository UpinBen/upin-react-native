import React from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/Screens/Homescreen';
import BottomNavigation from './components/BottomNavigation';
import AuthProvider from './components/utils/AuthContext';
import ProfileNavigator from './components/navigation/ProfileNavigator';
import PinNavigator from './components/navigation/PinsNavigation';


const Tab = createBottomTabNavigator();


export default function App() {

  return (
  <AuthProvider>
        <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomNavigation {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen}  />
         <Tab.Screen name="My Pins" component={PinNavigator} />
        <Tab.Screen name="Profile" component={ProfileNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  </AuthProvider>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
