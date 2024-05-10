// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from './supabase';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const [userId, setUserId] = useState(null); // Add state variable to store user ID
   const [userData, setUserData] = useState(null);

const login = async (session, id) => {
  setIsLoggedIn(true);
  setUserSession(session);
  try {
    // Fetch user data from the 'userData' table where 'userUID' is equal to auth ID
    const { data, error } = await supabase
      .from('userdata')
      .select('id')
      .eq('userUID', id)
      .single();

    if (error) {
      console.error('Error fetching user data:', error.message);
      return;
    }

    // Set the user ID in the state
    if (data) {
      setUserId(data.id);
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
};



  useEffect(() => {
    // Function to fetch user data based on userId
   const fetchUserData = async () => {
  if (userId) {
    try {
      // Fetch user data from the 'userData' table where 'id' is equal to userId
      const { data, error } = await supabase
        .from('userdata')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user data:', error.message);
        return;
      }

      // Set the user data in the state
      setUserData(data);
    } catch (error) {
      console.error('Unexpected error:', error.message);
    }
  }
};


    // Call fetchUserData when userId changes
    fetchUserData();
  }, [userId]);

  console.log(`is logged in from auth: ${isLoggedIn}`)
    console.log(`uid idfrom auth: ${userId}`)



  const logout = () => {
    setIsLoggedIn(false);
    setUserSession(null);
    setUserId(null); // Clear the user's ID when logging out
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, userSession, userId, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



export default AuthProvider
