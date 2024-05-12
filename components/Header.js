import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upin</Text>
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
    width: '100%'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Header;
