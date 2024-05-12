import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Alert, TouchableOpacity, Keyboard } from 'react-native';
import { interestsList } from '../utils/config';
import { supabase } from '../utils/supabase';
import { validateEmail, validatePasswordStrength, formatDate } from '../utils/functions';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birthYear, setBirthYear] = useState(''); 
 const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [signedUp, setSignedUp] = useState(false)

    const navigation = useNavigation();

  const handleBackButton = () => {
    setStep(1)
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleNext = () => {

     if (!validateEmail(email)) {
    Alert.alert('Error', 'Please enter a valid email address');
    return;
  }

       if (!validatePasswordStrength(password)) {
      Alert.alert('Error', 'Your password is not strong enough. Please make sure it contains at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    // Proceed to the next step
     if (!firstName || !lastName || !email || !password || !phone || !birthYear) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
        console.log('moving onto next', { firstName, lastName, email, phone, password, birthYear });
    setStep(step + 1);
  };




const handleSignUp = async () => {
  try {
    // Sign up the user using Supabase auth
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    // Log the response from the authentication
    console.log('Authentication response:', data.user, error);

    if (error) {
      // Handle error if sign-up fails
      Alert.alert('Error', 'An error occurred while signing up. Please try again later.');
      console.error('Error signing up:', error.message);
    } else {
      // Get the user ID from the authentication result
     // const userId = data.id;

      // Insert additional user data into the 'userData' table
      const { error: insertError } = await supabase
        .from('userdata')
        .insert({
          email: email,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          interests: selectedInterests,
          birthYear: birthYear,
          userUID: data.user.id
        });

      if (insertError) {
        // Handle error if insertion fails
        Alert.alert('Error', 'An error occurred while saving user data.');
        console.error('Error saving user data:', insertError.message);
      } else {
        // Handle successful sign-up and data insertion
        Alert.alert('Success', 'You have signed up successfully!');
        console.log('User signed up:', data);
        navigation.navigate('Profile'); 
      }
    }
  } catch (error) {
    // Handle any unexpected errors
    Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    console.error('Unexpected error:', error.message);
  }
};


    const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };


  return (
    <View style={styles.container}  onTouchStart={dismissKeyboard}>
     {signedUp ? <Text>Thank you for signing up with Upin!</Text> : <>
      {step === 1 && (
        <>
         <Text style={styles.title}>Tell Us About Yourself</Text>
          <TextInput
             style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            placeholderTextColor="#A9A9A9" 
          />
       
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last name"
      />
        <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            placeholderTextColor="#A9A9A9" 
            keyboardType="email-address"
            autoCapitalize="none"
          />

        <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone number"
            placeholderTextColor="#A9A9A9" 
            keyboardType="phone-pad" // Use phone-pad keyboard type for phone number
          />
          <TextInput
             style={styles.input}
            value={birthYear}
            onChangeText={setBirthYear}
            placeholder="Birth year"
            placeholderTextColor="#A9A9A9" 
          />
      

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#A9A9A9" 
        secureTextEntry
      />

      
      <Text style={styles.passwordHint}>
        Your password must contain at least 8 characters including at least one number, one upper case, and one lower case character.
      </Text>

        </>
      )}

         {step === 2 && (
        <>
          <Text style={styles.title}>Select Your Interests</Text>
          <View style={styles.buttonsContainer}>
            <View style={styles.column}>
              {interestsList.slice(0, Math.ceil(interestsList.length / 2)).map((interest) => (
                <TouchableOpacity
                  key={interest}
                  style={[
                    styles.button,
                    selectedInterests.includes(interest) && styles.buttonSelected,
                  ]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text style={[styles.buttonText, selectedInterests.includes(interest) && styles.buttonTextSelected]}>
                    {interest}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.column}>
              {interestsList.slice(Math.ceil(interestsList.length / 2)).map((interest) => (
                <TouchableOpacity
                  key={interest}
                  style={[
                    styles.button,
                    selectedInterests.includes(interest) && styles.buttonSelected,
                  ]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text style={[styles.buttonText, selectedInterests.includes(interest) && styles.buttonTextSelected]}>
                    {interest}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.selectedInterestsContainer}>
            <Text style={styles.selectedInterestsTitle}>Selected Interests:</Text>
            {selectedInterests.map((interest) => (
              <Text key={interest} style={styles.selectedInterest}>
                {interest}
              </Text>
            ))}
          </View>
        </>
      )}

    

      {/* Button */}
      {step === 2 ? (
        <View style={styles.ButtonContainer}>
          <Button title="Go Back" onPress={handleBackButton} />
          <Button title="Sign Up" onPress={handleSignUp} />
        </View>
      ) : (
        <Button title="Next" onPress={handleNext} />
      )}
     </>}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: -40, // Apply negative margin to remove space from the top
  },
  input: {
    width: windowWidth - 40, // Subtracting padding
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordHint: {
    fontSize: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  column: {
    flex: 1,
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#0FBC71',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
  },
  buttonSelected: {
    backgroundColor: '#0FBC71',
  },
  buttonTextSelected: {
    color: 'white',
  },
  selectedInterestsContainer: {
    alignItems: 'center',
  },
  selectedInterestsTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedInterest: {
    fontSize: 14,
    marginBottom: 5,
  },
  ButtonContainer: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row'
  }
});

export default SignUp;
