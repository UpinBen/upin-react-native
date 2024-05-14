import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PinsHeader from '../PinsHeader';
import CreatePin from '../Pins/CreatePin';
import PinScreen from '../Screens/PinScreen'

const PinStack = createStackNavigator();

const PinNavigator = () => {
  return (
    <PinStack.Navigator screenOptions={{ headerShown: false }}>
      <PinStack.Screen name="Pins" component={PinScreen} />
       <PinStack.Screen name="CreatePin" component={CreatePin} />
    </PinStack.Navigator>
  );
};

export default PinNavigator;
