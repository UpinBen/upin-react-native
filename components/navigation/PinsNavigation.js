import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Pins from '../Pins';
import CreatePin from '../Pins/CreatePin';

const PinStack = createStackNavigator();

const PinNavigator = () => {
  return (
    <PinStack.Navigator screenOptions={{ headerShown: false }}>
      <PinStack.Screen name="Pins" component={Pins} />
       <PinStack.Screen name="CreatePin" component={CreatePin} />
    </PinStack.Navigator>
  );
};

export default PinNavigator;
