import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const VerticalCarousel = ({ data, activeIndex, onItemPress }) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onItemPress(index)}
          style={styles.item}
        >
          <Text
            style={[
              styles.text,
              index === activeIndex ? styles.activeText : styles.inactiveText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginBottom: 20,
    padding: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  activeText: {
    fontSize: 20, // Increase font size for active text
    color: colors.mainColor, // Set color for active text
  },
  inactiveText: {
    fontSize: 18, // Default font size for inactive text
    color: 'gray', // Default color for inactive text
  },
});

export default VerticalCarousel;
