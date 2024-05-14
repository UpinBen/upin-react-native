import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity  } from 'react-native';
import { AuthContext } from '../utils/AuthContext';
import LoginScreen from './LoginScreen';

const ProfileScreen = () => {
  const { isLoggedIn, userData, userId, logout } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (userData) {
      // Combine firstName and lastName to create fullName
      const fullName = `${userData.firstName} ${userData.lastName}`;
      setName(fullName);

      // Parse the string representation of interests into an array
    const interestsArray = JSON.parse(userData.interests);
    setInterests(interestsArray);
    
    }
  }, [userData]);

  return (
    <View style={profileStyles.container}>
      {isLoggedIn ? (
        <View style={profileStyles.profileContainer}>
          <Text style={profileStyles.nameText}>You are logged in as</Text>
          <Text style={profileStyles.fullName}>{name}</Text>
          <Text style={profileStyles.sectionTitle}>Interests:</Text>
              {interests.map((interest, index) => (
                <TouchableOpacity key={index} style={profileStyles.interestTouchable}>
                  <Text style={profileStyles.interestText}>{interest}</Text>
                </TouchableOpacity>
              ))}
              <View  style={profileStyles.logoutButtonContainer}>
                <Button style={profileStyles.logoutButton} title="Logout" onPress={logout} />
              </View>
        </View>
    
      ) : (
        <LoginScreen />
      )}
    </View>
  );
};

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  profileContainer: {
    alignItems: 'center',
    height: '90%',
    width: '95%'
    
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fullName: {
    fontSize: 24,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  interestText: {
    borderColor: '#0FBC71',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 90
  },
   logoutButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default ProfileScreen;
