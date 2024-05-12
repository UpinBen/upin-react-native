import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validateEmail } from './utils/functions';
import { supabase } from './utils/supabase';
import { AuthContext } from './utils/AuthContext';

const LoginScreen = () => {
   const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState(new Date()); 
  const navigation = useNavigation();


const handleLogin = async () => {
  // Check if email and password are provided and if the email is in a valid format
  if (!email.trim() || !password.trim()) {
    Alert.alert('Error', 'Please enter both email and password.');
    return;
  }

  if (!validateEmail(email)) {
    Alert.alert('Error', 'Please enter a valid email address.');
    return;
  }

  try {
    // Sign in the user using Supabase auth
    const { data, session, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // Check if the error is due to email not being confirmed
      if (error.message === 'Email not confirmed') {
        Alert.alert(
          'Error',
          'Your email address has not been confirmed. Please check your email for the confirmation link.',
          [
            {
              text: 'Resend Confirmation Email',
              onPress: async () => {
                // Resend the confirmation email
                await supabase.auth.resendVerificationEmail(email);
                Alert.alert('Success', 'Confirmation email has been resent.');
              },
            },
          ]
        );
      } else {
        // Handle other authentication errors
        Alert.alert('Error', 'Invalid email or password. Please try again.');
        console.error('Error signing in:', error.message);
      }
    } else {
      // Handle successful sign-in
      Alert.alert('Success', 'You have signed in successfully!');
      console.log('User signed in:', data);
      userID = data.user.id
      console.log(`user auth id: ${userID}`)
      login(session, data.user.id)
      navigation.navigate('Profile'); 
    }
  } catch (error) {
    // Handle any unexpected errors
    Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    console.error('Unexpected error:', error.message);
  }
};



  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the SignUp screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.joinText}>Join Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',
    marginTop: 90,
     width: '100%', // Adjust the width of the container to make the form wider
  },
   border: {
    borderWidth: 1, // Add border width
    borderColor: 'red', // Border color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '90%',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0FBC71',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '40%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  joinText: {
        color: 'darkblue',
    fontSize: 24, // Increase the font size
    textAlign: 'center', // Center the text horizontally
    marginTop: 20, // Adjust the top margin as needed
  }
});

export default LoginScreen;
