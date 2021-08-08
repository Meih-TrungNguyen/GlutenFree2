
import React, { Component, useState } from 'react';

import { View, Text, Image, StyleSheet, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase'
import HomeScreen from './screens/Home';
import RegisterScreen from './screens/Register';
import LoginScreen from './screens/Login';
import LandingScreen from './screens/Landing';
import NewCart from './screens/NewCart';
import 'react-native-gesture-handler';
import splashPic from './assets/GlutenFreeSplash.jpg';
import AddItem from './screens/AddItem';
import ViewCart from './screens/ViewCart';
import History from './screens/History';
import VerifyEmailScreen from './screens/VerifyEmail.js';
import RecoverScreen from './screens/PasswordRecover';
import LinkItem from './screens/LinkItem';
import Report from './screens/Report';
import EditItem from './screens/EditItem';
import Setting from './screens/Setting';
import EditProfile from './screens/EditProfile';
import EditAuth from './screens/EditAuth';

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

function splashScreen({ navigation }) {
  setTimeout(() => {
    navigation.replace("Landing"); //stack name
  }, 3000);

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
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Forgot Password" component={RecoverScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else if (loggedIn && !emailVerified) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Verify Email" component={VerifyEmailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NewCart" component={NewCart} />
            <Stack.Screen name="AddItem" component={AddItem} />
            <Stack.Screen name="ViewCart" component={ViewCart} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="LinkItem" component={LinkItem} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Report" component={Report} />
            <Stack.Screen name="EditItem" component={EditItem} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="EditAuth" component={EditAuth} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}

export default App;
