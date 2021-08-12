import React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, AntDesign, Fontisto, Octicons } from "@expo/vector-icons";
import firebase from "firebase";

require("firebase/firestore");

const Stack = createStackNavigator();
const CartCounter = 0;

const onLogout = () => {
  firebase.auth().signOut();
};

/**const setting a list of option 
 * to edit and make change into profile user
 */
const Setting = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/Home-screen.jpg")}
      style={styles.backgroundImage}
    >
      <Text style={styles.topText}>Setting</Text>
      <View style={styles.screenContainer}>
        <View style={styles.textBoxView}>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            title="Edit your personal info"
          >
            <AntDesign name="edit" size={70} color="black" />
          </TouchableOpacity>
          {/* go to Edit Profile screen */}
          <Text style={styles.textElement}>Edit Profile</Text>
        </View>

        <View style={styles.textBoxView}>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditAuth")}
            title="Change your current email address or password"
          >
            <AntDesign name="edit" size={70} color="black" />
          </TouchableOpacity>
          {/* go to authentification screen */}
          <Text style={styles.textElement}>Change authenticate info</Text>
        </View>

        <View style={styles.textBoxView}>
          <TouchableOpacity
            onPress={() => onLogout()}
            title="Logout of this account"
          >
            <AntDesign name="logout" size={70} color="black" />
          </TouchableOpacity>
          <Text style={styles.textElement}>Logout</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

// Styling for screen
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
  },
  buttons: {
    backgroundColor: "dodgerblue",
    color: "white",
    height: 35,
    width: 150,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  space: {
    width: 20,
    height: 10,
  },
  textBoxView: {
    flexDirection: "row",
    paddingTop: 30,
  },
  textBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  textElement: {
    fontSize: 25,
    marginTop: 8,
    textAlign: "center",
    color: "black",
    marginLeft: 20,
  },
  topText: {
    fontSize: 35,
    marginTop: 20,
    textAlign: "center",
    color: "black",
  },
});
export default Setting;
