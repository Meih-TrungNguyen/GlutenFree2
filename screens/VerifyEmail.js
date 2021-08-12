import React from "react";
import firebase from "firebase";
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { withTheme } from "react-native-elements";

/**function VerifyEmail check if email exit by sending 
 * email to be confirmed.
 */
export default function VerifyEmail() {
  const onLogout = () => {
    firebase.auth().signOut();
  };

  const verify = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then((result) => {
        alert("Verify Email Sent");
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/gluten-free-background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.screenContainer}>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => verify()}>
            <Text style={styles.textElement}>Send Verify Email</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space} />
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => onLogout()}>
            <Text style={styles.textElement}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

// Styling for screen
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 300,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttons: {
    backgroundColor: "lightgrey",
    color: "white",
    fontSize: 200,
    height: 50,
    width: 200,
  },
  space: {
    width: 20,
    height: 20,
  },
  textBox: {
    marginBottom: 100,
    fontSize: 45,
    color: "brown",
  },
  textElement: {
    fontSize: 25,
    marginTop: 8,
    textAlign: "center",
  },
});
