import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { fontSizes, MAPBOX_TOKEN_API } from "../utils/config";
import { formatDateTime } from "../utils/functions";
import { supabase } from "../utils/supabase";
import VerticalCarousel from "./VerticalCarousel";
import { AuthContext } from "../utils/AuthContext";
import { NextButton, PrevButton } from "../Buttons";

const CreatePin = () => {
  const [step, setStep] = useState(1);
  const carouselData = ["Invite Only", "Public Pin", "Private Pin"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinTitle, setPinTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const navigation = useNavigation();

  const { isLoggedIn, userData, userId } = useContext(AuthContext);

  // console.log(`user id from create pin: ${userId}`)

  const handleItemPress = (index) => {
    setActiveIndex(index);
  };

  const onStartDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setStartDate(selectedDate);
    }
    console.log(selectedDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleCancel = () => {
    console.log("Cancel button pressed");
    navigation.navigate("Pins");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const searchAddress = async (query) => {
    try {
      // Replace the API endpoint with the Mapbox Geocoding API
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${MAPBOX_TOKEN_API}`
      );
      const data = await response.json();

      // Extract the relevant address information from the response
      const suggestions = data.features.map((feature) => ({
        display_name: feature.place_name,
        // Add other relevant address fields here
      }));

      setLocationSuggestions(suggestions);
    } catch (error) {
      console.error("Error searching address:", error);
      setLocationSuggestions([]);
    }
  };

  const handleAddressChange = (text) => {
    setLocation(text);
    if (text.length > 2) {
      searchAddress(text);
    } else {
      setLocationSuggestions([]);
    }
  };

  const selectAddress = (address) => {
    // Handle selecting the address
    console.log("Selected address:", address);
    setQuery(address.display_name);
    setLocationSuggestions([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectAddress(item)}>
      <View>
        <Text>{item.display_name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleNextStep = () => {
    // If the current step is 2 and pinTitle or shortDescription is missing, show alert and return
    if (step === 2 && (!pinTitle || !shortDescription)) {
      Alert.alert("Please enter a title and description");
      return; // Prevent further execution of the function
    }

    // If the current step is 3 and startDate or endDate is missing, show alert and return
    if (step === 3 && (!startDate || !endDate)) {
      Alert.alert("Please enter start and end dates");
      return; // Prevent further execution of the function
    }

    // Otherwise, advance to the next step
    setStep((prevStep) => (prevStep < 5 ? prevStep + 1 : prevStep));
  };

  const handlePreviousStep = () => {
    // Handle going back to the previous step
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const handleCreatePin = async () => {
    try {
      // Insert additional user data into the 'pins' table
      const { data: pinData, error: pinError } = await supabase
        .from("pins")
        .insert({
          host_id: userId,
          pin_type: carouselData[activeIndex],
          meetupname: pinTitle,
          description: shortDescription,
          start_date: startDate,
          end_date: endDate,
        })
        .select("*");

      // Log pinData[0] before inserting into 'userdata' table
      console.log("Inserted Pin Data:", pinData[0]);

      console.log("inserted pin id: ", pinData[0].id);

      if (pinError) {
        // Handle error if insertion into 'pins' table fails
        Alert.alert("Error", "An error occurred while saving pin data.");
        console.error("Error saving pin data:", pinError.message);
      }

      if (!pinError) {
        // Reset state variables
        setPinTitle("");
        setShortDescription("");
        setStep(1);
        setActiveIndex(0);
        setStartDate(new Date());
        setEndDate(new Date());

        // Handle successful data insertion into both tables
        Alert.alert("Success", "Your pin has succesfully been created!");
        console.log("User data saved successfully!");

        navigation.navigate("Pins");
      }
    } catch (error) {
      // Handle any unexpected errors
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      );
      console.error("Unexpected error:", error.message);
    }
  };

  return (
    <View style={createPinStyles.container}>
      <TouchableOpacity
        style={createPinStyles.cancelButton}
        onPress={handleCancel}
      >
        <Text style={createPinStyles.cancelText}>Cancel</Text>
      </TouchableOpacity>

      <Text style={createPinStyles.stepText}>Step {step} of 5</Text>

      {step === 1 && (
        <>
          <Text style={createPinStyles.text}>Type of Pin</Text>
          <Text style={createPinStyles.text}>
            This step cannot be edited later on
          </Text>
          <Text style={createPinStyles.paragraph}>
            Invite only pins will not be displayed on the map and is invite only
            to join the pin
          </Text>
          <VerticalCarousel
            data={carouselData}
            activeIndex={activeIndex}
            onItemPress={handleItemPress}
          />

          <NextButton onPress={handleNextStep} />
        </>
      )}

      {step === 2 && (
        <View style={createPinStyles.descriptionContainer}>
          <View style={createPinStyles.textContainer}>
            <Text>Describe Your Event</Text>
            <TextInput
              style={createPinStyles.input}
              onChangeText={(text) => setPinTitle(text)}
              value={pinTitle}
              placeholder="Pin Title"
            />
            <TextInput
              style={createPinStyles.input}
              onChangeText={(text) => setShortDescription(text)}
              value={shortDescription}
              placeholder="Short Description"
            />
          </View>

          <View style={createPinStyles.buttonContainer}>
            <PrevButton onPress={handlePreviousStep} />
            <NextButton onPress={handleNextStep} />
          </View>
        </View>
      )}

      {step == 3 && (
        <View style={createPinStyles.stepContainer}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image source={{ uri: image }} style={createPinStyles.image} />
          )}
          <PrevButton onPress={handlePreviousStep} />
          <NextButton onPress={handleNextStep} />
        </View>
      )}

      {step == 4 && (
        <View style={createPinStyles.locationContainer}>
          <View>
            <TextInput
              placeholder="Enter an address"
              value={location}
              onChangeText={handleAddressChange}
            />
            <FlatList
              data={locationSuggestions}
              renderItem={renderItem}
              keyExtractor={(item) => item.place_id}
            />
          </View>
          <PrevButton onPress={handlePreviousStep} />
          <NextButton onPress={handleNextStep} />
        </View>
      )}

      {step == 5 && (
        <>
          <Text>Start Date: {formatDateTime(startDate)}</Text>
          <DateTimePicker
            value={startDate}
            mode="datetime"
            display="default"
            onChange={onStartDateChange}
          />

          <Text>End Date: {formatDateTime(endDate)}</Text>
          <DateTimePicker
            value={endDate}
            mode="datetime"
            display="default"
            onChange={onEndDateChange}
          />

          <PrevButton onPress={handlePreviousStep} />
          <Button title="Create Pin" onPress={handleCreatePin} />
        </>
      )}
    </View>
  );
};

const createPinStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,

    alignItems: "center",
  },
  text: {
    fontSize: fontSizes.h4,
    marginBottom: 5,
  },
  stepText: {
    fontSize: fontSizes.h3,
    marginTop: 10,
    marginBottom: 10,
  },
  paragraph: {
    marginTop: 10,
    fontSize: fontSizes.h4,
    width: "75%",
  },
  cancelButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 10,
  },
  cancelText: {
    fontSize: fontSizes.h3,
    color: "green",
  },
  carousel: {
    marginTop: 25,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
    marginTop: 60,
    marginLeft: 10,
  },
  stepContainer: {
    marginTop: 60,
    justifyContent: "center",
    height: 80,
    width: "90%",
  },
  descriptionContainer: {
    marginTop: "10%",
    width: "95%",
  },
  textContainer: {
    marginTop: 50,
    width: "90%",
    alignItems: "center", // Center horizontally
    marginBottom: 60,
  },
  image: {
    width: 100,
    height: 100,
  },
  rightButton: {
    alignSelf: "flex-end", // Align the "Next" button to the right
  },
});

export default CreatePin;
