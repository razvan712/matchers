import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useMutation } from "react-query";
import { RegisterUser } from "../utils/auth";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { secondaryColor } from "../utils/colors";

const RegisterScreen = ({ navigation }) => {
  const { setIsAuthenticated , user, setUser} = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Disable the drawer menu and swipe gesture for this screen
    navigation.setOptions({
      swipeEnabled: false, // This won't work directly, included for demonstration
      gestureEnabled: false, // Prevent swiping to open the drawer
      headerLeft: () => null, // Hide the hamburger menu icon
    });
  }, [navigation]);

  const registerMutation = useMutation(RegisterUser, {
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data);
      AsyncStorage.setItem("user", JSON.stringify(data));
      setUsername("");
      setPassword("");
      navigation.navigate("Home");
      console.log(data, "Login successful");
    },
    onError: (error) => { 
      console.error(error);
      setPassword("");
      setUsername("");
      alert("Registration failed");
    },
  });

  const handleRegisterPress = () => {
    registerMutation.mutate({ username, password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
   
        <TextInput
         outlineStyle={{
        borderRadius:  25,
      }}
          mode="outlined"
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
          outlineColor={secondaryColor}
        underlineColor={secondaryColor}
        activeUnderlineColor={secondaryColor}
        activeOutlineColor={secondaryColor}
        />
        <TextInput
         outlineStyle={{
        borderRadius:  25,
      }}
        mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
          outlineColor={secondaryColor}
        underlineColor={secondaryColor}
        activeUnderlineColor={secondaryColor}
        activeOutlineColor={secondaryColor}
        />
        <Button
          mode="contained"
          onPress={handleRegisterPress}
          disabled={registerMutation.isLoading}
          style={styles.button}
          buttonColor={secondaryColor}
       
        >
          Register
        </Button>
        <Button
          style={{
            width: 120,
            alignSelf: "center",
          }}
          onPress={() => navigation.navigate("Login")}
          disabled={registerMutation.isLoading}
         
          textColor={secondaryColor}
        >
          Back to Login
        </Button>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    minWidth: 120, 
    alignSelf: "center",
  },
});

export default RegisterScreen;
