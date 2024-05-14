// Buttons.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fontSizes } from './utils/config';

const NextButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={buttonstyles.nextButton}>Next</Text>
    </TouchableOpacity>
  );
};

const PrevButton = ({ onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <Text style={buttonstyles.prevButton}>Previous</Text>
    </TouchableOpacity>
  );
};

const buttonstyles = StyleSheet.create({
    nextButton: {
        fontSize: fontSizes.h3,
        fontWeight: 'bold',
        marginBottom: 10
    },
        prevButton: {
        fontSize: fontSizes.h3,
        fontWeight: 'bold'
    },
});

export { NextButton, PrevButton };
