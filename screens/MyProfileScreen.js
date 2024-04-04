// screens/MyProfileScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { secondaryColor } from "../utils/colors";
import { Button, Icon } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyProfileScreen = ({ navigation }) => {
  const { isAuthenticated, setIsAuthenticated, user } = useAuth();


  const handleLogout = () => {
    setIsAuthenticated(false);
    AsyncStorage.removeItem("user");

    navigation.navigate("Login");
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 20,
          color: secondaryColor,
          // fontFamily: "SuperFunky",
          width: "80%",
          textAlign: "center",
        }}> 
          <Icon
            source="emoticon"
            color={secondaryColor}
            size={30}
            style={{ marginRight: 10 }}
          />
          Welcome to Hangout!
        You are not logged in</Text>
        <Button 
        buttonColor={secondaryColor}
        textColor="white"
         onPress={() => navigation.navigate("Login")}>Go to Login</Button>
      </View>
    );
  }

  return  (
    <View style={styles.container}>
      {user && user.user ? ( // Check if `user` and `user.user` exist
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            color: secondaryColor,
            // fontFamily: "SuperFunky",
            width: "80%",
            textAlign: "center",
          }}
        >
          Hello! You are logged-in as {user.user.username}
          <Icon
            source="hand-peace"
            color={secondaryColor}
            size={30}
            style={{ marginRight: 10 }}
          />
        </Text>
      ) : (
        // Fallback text or component if user data is not available
        <Text style={styles.fallbackText}>Loading user data...</Text>
      )}
  
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
  
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    marginTop: 20,
    width: "60%",
    backgroundColor: secondaryColor,
    borderRadius: 10,
    padding: 10,
  },
  logoutText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  fallbackText: {
    fontSize: 16,
    color: secondaryColor,
  },

});
