import React from "react";
import Button from "@material-ui/core/Button";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { useFonts } from "@expo-google-fonts/raleway";
import { makeStyles } from "@material-ui/core/styles";

export default function Landing({ navigation }) {
  /**
   * Load the Google Questrial Font for the project
   */
  let [fontsLoaded, error] = useFonts({
    Questrial: require("../assets/fonts/Questrial-Regular.ttf"),
  });

  const classes = useStyles();

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.description}>
        Get your medical tax back for your gluten free products
      </Text>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/gluten-free.png")}
      ></ImageBackground>
      <View>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => navigation.navigate("Login")}
        >
          Sign In
        </Button>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpMessage}>Doesn't have an account?</Text>
          <Text
            style={styles.signUpBtn}
            onClick={() => navigation.navigate("Register")}
          >
            Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "50px",
    fontFamily: "Questrial",
    fontWeight: "600",
    backgroundColor: "#FFCD29",
  },
}));

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "230px",
    height: "230px",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    position: "absolute",
    top: "120px",
    fontWeight: "1000",
    fontSize: "30px",
    fontFamily: "Questrial",
  },
  description: {
    position: "absolute",
    top: "170px",
    fontSize: "16px",
    marginLeft: "30px",
    marginRight: "30px",
    fontFamily: "Questrial",
    textAlign: "center",
    lineHeight: "1.4",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  signUpBtn: {
    marginLeft: "10px",
    fontSize: "16px",
    color: "#1976D2",
    fontFamily: "Questrial",
  },
  signUpMessage: {
    fontSize: "16px",
    fontFamily: "Questrial",
  },
});
