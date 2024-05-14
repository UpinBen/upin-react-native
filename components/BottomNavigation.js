import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const PinImage = require('../assets/pin.png');
const InactivePinImage = require('../assets/darkpin.png');

const BottomNavigation = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconSource = isFocused ? PinImage : InactivePinImage;

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tab}
          >
            <Image
              source={iconSource}
              style={styles.icon}
            />
            <Text style={{ color: isFocused ? '#00f' : '#000' }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#eee',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default BottomNavigation;
