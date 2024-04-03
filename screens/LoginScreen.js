import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useMutation } from "react-query";
import { LoginUser } from "../utils/auth";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { secondaryColor } from "../utils/colors";




export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated, isAuthenticated, user, setUser } = useAuth();
  const [error, setError] = useState("");


  useEffect(() => {
    // Disable the drawer menu and swipe gesture for this screen
    navigation.setOptions({
      swipeEnabled: false, // This won't work directly, included for demonstration
      gestureEnabled: false, // Prevent swiping to open the drawer
      headerLeft: () => null, // Hide the hamburger menu icon
    });
  }, [navigation]);
 

  const { mutate, isLoading } = useMutation(LoginUser, {
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data);
      AsyncStorage.setItem("user", JSON.stringify(data));
      setPassword("");
      setUsername("");
      setError(""); 
      navigation.navigate("Home");
      console.log(data, "Login successful");
    },
    onError: (error) => {
      console.error(error);
      setPassword("");
      setUsername("");
      setError(error.response?.data?.message || "An error occurred during login.");
    },
  });

  const handleLogin = () => {
    mutate({ username, password });
   
    

  };

  const handleAdminLogin = () => {
    mutate({ username: "Superadmin",
    password: "adrian123" });
  }

  console.log("isAuthenticated", isAuthenticated);
  

  return (
    <View style={styles.container}>
      <TextInput
      outlineStyle={{
        borderRadius:  25,
      }}
      mode="outlined"
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        outlineColor={secondaryColor}
        underlineColor={secondaryColor}
        activeUnderlineColor={secondaryColor}
        activeOutlineColor={secondaryColor}
      />
      <TextInput
      outlineStyle={{
        borderRadius: 25,
      }}
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        outlineColor={secondaryColor}
        underlineColor={secondaryColor}
        activeUnderlineColor={secondaryColor}
        activeOutlineColor={secondaryColor}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null} 
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={isLoading}
        disabled={isLoading}
      buttonColor={secondaryColor}
        style={{
          minWidth: 100,
          alignSelf: "center",
        }}
      >
        Login
      </Button>
      <Button  style={{
        width:120,
        alignSelf:"center"
      }} textColor={secondaryColor} onPress={() => navigation.navigate("Register")}>
        Go to Register
      </Button>
      <Button style={{
        width:120,
        alignSelf:"center"
      }} textColor={secondaryColor}
        onPress={() => {
          mutate({ username: "Superadmin", password: "adrian123" });
        }}
      >Try as admin</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 10,
    
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
