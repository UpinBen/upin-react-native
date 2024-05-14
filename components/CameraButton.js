import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Import the camera icon from react-native-vector-icons
import colors, { Colors } from "./utils/colors";

const CameraButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <FontAwesome5 name="camera" size={100} color={colors.mainColor} />
        <Text style={styles.text}>Pick an image from camera roll</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: colors.mainColor,
    fontWeight: "bold",
  },
});

export default CameraButton;
