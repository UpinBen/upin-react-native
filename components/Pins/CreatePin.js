import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { fontSizes } from '../utils/config';
import { formatDateTime } from '../utils/functions';
import { supabase } from '../utils/supabase';
import VerticalCarousel from './VerticalCarousel';
import { AuthContext } from '../utils/AuthContext';

const CreatePin = () => {
    const carouselData = ["Invite Only", "Public Pin", "Private Pin"];
    const [pinTitle, setPinTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [step, setStep] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);
     const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
    const navigation = useNavigation();

     const { isLoggedIn, userData, userId } = useContext(AuthContext);

     console.log(`user id from create pin: ${userId}`)

    const handleItemPress = (index) => {
        setActiveIndex(index);
    };

      const onStartDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setStartDate(selectedDate);
    }
    console.log(selectedDate)
  };

  const onEndDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

    const handleCancel = () => {
        console.log('Cancel button pressed');
        navigation.navigate('Pins'); 
    };

    const handleNextStep = () => {
        // Handle advancing to the next step
        setStep(prevStep => prevStep < 5 ? prevStep + 1 : prevStep);
    };

    const handlePreviousStep = () => {
        // Handle going back to the previous step
        setStep(prevStep => prevStep > 1 ? prevStep - 1 : prevStep);
    };
   useEffect(() => {
        console.log('Index:', carouselData[activeIndex]);
        console.log('Short Description:', shortDescription);
        console.log('Pin Title:', pinTitle);
        console.log('start date: ', startDate)
    }, [activeIndex, shortDescription, pinTitle, startDate]);

const handleSignUp = async () => {
  try {
    // Insert additional user data into the 'pins' table
    const { error } = await supabase
      .from('pins')
      .insert({
        host_id: userId,
        pin_type: carouselData[activeIndex],
        meetupname: pinTitle,
        description: shortDescription,
        start_date: startDate,
        end_date: endDate
      });

    if (error) {
      // Handle error if insertion fails
      Alert.alert('Error', 'An error occurred while saving user data.');
      console.error('Error saving user data:', error.message);
    } else {
      // Handle successful data insertion
      Alert.alert('Success', 'Data inserted successfully!');
      console.log('User data saved successfully!');
      navigation.navigate('Profile'); 
    }
  } catch (error) {
    // Handle any unexpected errors
    Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    console.error('Unexpected error:', error.message);
  }
};



    return (
        <View style={createPinStyles.container}>
            <TouchableOpacity style={createPinStyles.cancelButton} onPress={handleCancel}>
                <Text style={createPinStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <Text style={createPinStyles.stepText}>Step {step} of 5</Text>

            {step === 1 && (
                <>
                    <Text style={createPinStyles.text}>Type of Pin</Text>
                    <Text style={createPinStyles.text}>This step cannot be edited later on</Text>
                    <Text style={createPinStyles.paragraph}>Invite only pins will not be displayed on the map and is invite only to join the pin</Text>
                    <VerticalCarousel
                        data={carouselData}
                        activeIndex={activeIndex}
                        onItemPress={handleItemPress}
                    />
                    <TouchableOpacity onPress={handleNextStep}>
                        <Text style={[createPinStyles.nextButton, createPinStyles.rightButton]}>Next</Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 2 && (
                <>
                    <TextInput
                        style={createPinStyles.input}
                        onChangeText={text => setPinTitle(text)}
                        value={pinTitle}
                        placeholder="Pin Title"
                    />
                    <TextInput
                        style={createPinStyles.input}
                        onChangeText={text => setShortDescription(text)}
                        value={shortDescription}
                        placeholder="Short Description"
                    />
                    <View style={createPinStyles.buttonContainer}>
                        {step > 1 && (
                            <TouchableOpacity onPress={handlePreviousStep}>
                                <Text style={createPinStyles.prevButton}>Previous</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={handleNextStep}>
                            <Text  style={createPinStyles.nextButton}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

               {step == 3 && (
                   <>
                     <Text>Start Date: {formatDateTime(startDate)}</Text>
                      <DateTimePicker
                    value={startDate}
                    mode="datetime"
                    display="default"
                    onChange={onStartDateChange} />

                    <Text>End Date: {formatDateTime(endDate)}</Text>
                    <DateTimePicker
                        value={endDate}
                        mode="datetime"
                        display="default"
                        onChange={onEndDateChange} />

                         <Button title="Sign Up" onPress={handleSignUp} />
                        </>
            )}


            {step == 5 && (
                <Button title="Sign Up" onPress={handleSignUp} />
            )}


        </View>
    );
};

const createPinStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    text: {
        fontSize: fontSizes.h4,
        marginBottom: 5
    },
    stepText: {
        fontSize: fontSizes.h3,
        marginTop: 10,
        marginBottom: 10
    },
    paragraph: {
        marginTop: 10,
        fontSize: fontSizes.h4,
        width: '75%'
    },
    cancelButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
    },
    cancelText: {
        fontSize: fontSizes.h3,
        color: 'green', 
    },
    carousel: {
        marginTop: 25
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 10,
    },
    nextButton: {
        fontSize: fontSizes.h3,
        fontWeight: 'bold',
        marginBottom: 10
    },
    prevButton: {
        fontSize: fontSizes.h3,
        fontWeight: 'bold'
    },
    rightButton: {
        alignSelf: 'flex-end', // Align the "Next" button to the right
    }
});

export default CreatePin;
