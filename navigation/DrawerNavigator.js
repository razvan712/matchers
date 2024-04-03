import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import AboutScreen from "../screens/AboutScreen";
import { primaryColor, secondaryColor } from "../utils/colors";
import { TouchableOpacity, Image } from "react-native";
import { Icon, MD3Colors } from "react-native-paper";
import {useAuth} from '../context/AuthContext';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Drawer = createDrawerNavigator();



const DrawerNavigator = () => {
  const {isAuthenticated} = useAuth();

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: primaryColor,
        },
        headerTitleStyle: {
          fontFamily: "SuperFunky",
        },
        headerTintColor: secondaryColor,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("My Profile")}
            title="Info"
            color="#fff"
            style={{ marginRight: 10 }}
          >
           { isAuthenticated?<Icon
              source="emoticon"
              color={secondaryColor}
              size={30}
              style={{ marginRight: 10 }}
            />:<Icon
              source="account"
              color={secondaryColor}
              size={30}
              style={{ marginRight: 10 }}
            />
            
            }
          </TouchableOpacity>
        ),
        drawerContentStyle: {
          backgroundColor: secondaryColor,
        },
        drawerActiveTintColor: primaryColor,
        drawerInactiveTintColor: "white",
      })}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
      />
        <Drawer.Screen name="My Profile" component={MyProfileScreen} options={{ drawerItemStyle: { display: 'none' } }} />
         <Drawer.Screen name="Login" component={LoginScreen} options={{ drawerItemStyle: { display: 'none' } }}/>
          <Drawer.Screen name="Register" component={RegisterScreen} options={{ drawerItemStyle: { display: 'none' } }} />

      {isAuthenticated && (
        <>
          <Drawer.Screen name="Services" component={AboutScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
