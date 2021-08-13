import React, { Component, useState } from "react";

import { View, Text, Image, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import HomeScreen from "./screens/Home";
import RegisterScreen from "./screens/Register";
import LoginScreen from "./screens/Login";
import LandingScreen from "./screens/Landing";
import "react-native-gesture-handler";
import splashPic from "./assets/GlutenFreeSplash.jpg";
import AddItem from "./screens/AddItem";
import ViewCart from "./screens/ViewCart";
import ViewThisCart from "./screens/ViewThisCart";
import EditItem from "./screens/EditItem";

import VerifyEmailScreen from "./screens/VerifyEmail.js";
import RecoverScreen from "./screens/PasswordRecover";
import LinkItem from "./screens/LinkItem";
import Report from "./screens/Report";
import EditProfile from "./screens/EditProfile";
import EditAuth from "./screens/EditAuth";

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyDckInyILOe18hoWEFGlP3H4x-inNdWFco",
  authDomain: "glutenfree-5acda.firebaseapp.com",
  projectId: "glutenfree-5acda",
  storageBucket: "glutenfree-5acda.appspot.com",
  messagingSenderId: "774957602388",
  appId: "1:774957602388:web:e7f36f10d639d82ed9ffc1",
  measurementId: "G-MJBL42EQSK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

/**
 * Run FlashScreen
 * @param {navigation} param0
 * @returns View for SplashScreen
 */
function splashScreen({ navigation }) {
  setTimeout(() => {
    navigation.replace("Landing"); //stack name
  }, 100);

  return (
    <View
      style={{
        backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image source={require("./assets/GlutenFreeSplash.jpg")} />
    </View>
  );
}

export class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loaded: false,
      emailVerified: false,
    };
  }

  /**
   * Run before rendering to check ì the user are logged in or not
   */
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
          emailVerified: firebase.auth().currentUser.emailVerified,
        });
      }
    });
  }

  /**
   * Render the UI, users are navigated to different Screen depend on their state.
   * @returns View
   */
  render() {
    const { loggedIn, emailVerified } = this.state;
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="splash_Screen"
              component={splashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                title: "",
                headerStyle: {
                  backgroundColor: "#F2F2F2",
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "",
                headerStyle: {
                  backgroundColor: "#F2F2F2",
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
            <Stack.Screen
              name="Forgot Password"
              component={RecoverScreen}
              options={{
                title: "",
                headerStyle: {
                  backgroundColor: "#F2F2F2",
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else if (loggedIn && !emailVerified) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Verify Email"
              component={VerifyEmailScreen}
              options={{
                title: "",
                headerStyle: {
                  backgroundColor: "#F2F2F2",
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddItem"
              component={AddItem}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewCart"
              component={ViewCart}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewThisCart"
              component={ViewThisCart}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="LinkItem"
              component={LinkItem}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="EditItem"
              component={EditItem}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Report"
              component={Report}
              options={{
                title: "",
                headerStyle: {
                  backgroundColor: "#F2F2F2",
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditAuth"
              component={EditAuth}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}

export default App;
