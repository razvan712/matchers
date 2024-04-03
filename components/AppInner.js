// Assuming AppInner is now always rendering DrawerNavigator

import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from '../navigation/DrawerNavigator';
import { useAuth } from "../context/AuthContext";

import React from "react";

const AppInner = () => {
    const { isAuthenticated } = useAuth();
  
    return (
      <NavigationContainer>
        <DrawerNavigator isAuthenticated={isAuthenticated} />
      </NavigationContainer>
    );
  };

  export default AppInner;
  