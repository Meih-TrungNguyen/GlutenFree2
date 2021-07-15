import React from "react";
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

export default function Landing({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/gluten-free-background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.screenContainer}>
        <Text style={styles.textBox}>GlutenFree App</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.textElement}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space} />
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.textElement}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

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
