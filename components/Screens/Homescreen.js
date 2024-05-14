import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Map from '../utils/Map';
import Header from '../Header';

const HomeScreen = () => {
  return (
    <View style={homeStyles.container}>
       <Header />
      <View style={homeStyles.mapContainer}>
        <Map />
      </View>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContainer: {
    height: 60, // Adjust the height as needed
    backgroundColor: '#0FBC71',
    width: '100%', // Set to cover the entire width of the screen
    position: 'absolute', // Position at the top of the screen
    top: 0, // Align at the top
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginTop: 19
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    marginTop: 0 // Adjust the margin as needed
  }
});




export default HomeScreen;
