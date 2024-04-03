import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Assuming not authenticated by default
  const [user, setUser] = useState(null); // Initial state is null

  useEffect(() => {
    // Asynchronously load the user data from AsyncStorage
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Parse the user string to an object
          setIsAuthenticated(true); // Assuming having a user means they are authenticated
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
