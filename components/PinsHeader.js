import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PinsHeader = () => {
    
const navigation = useNavigation();

  const handlePress = () => {

    console.log('Plus sign button pressed');
    navigation.navigate('CreatePin'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Pins</Text>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#0FBC71',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 19,
    width: '100%',
    flexDirection: 'row', // Align items horizontally
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Take up remaining space
  },
  button: {
    paddingHorizontal: 20, // Add padding around the plus sign
    position: 'absolute', // Position the button absolutely
    right: 0, // Align the button to the right
  },
  plusSign: {
    fontSize: 30,
    color: 'white', // Set color to white
  },
});

export default PinsHeader;
