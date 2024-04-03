import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GreetingsScreen from '../screens/GreetingsScreen';
import LoginScreen from  '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
   
      <Stack.Navigator
      screenOptions={{
        headerShown: false
          
      }}
      
       initialRouteName="Greetings">
        <Stack.Screen name="Greetings" 
         component={GreetingsScreen} />
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
   
  );
}

export default AuthNavigator;
