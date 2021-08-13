import React from "react";
import firebase from "firebase";
import { View, Image, Text } from "react-native";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

export default function VerifyEmail() {
  const onLogout = () => {
    firebase.auth().signOut();
  };
  const classes = useStyles();
  /**
   * Send a verify Email to users
   */
  const verify = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then((result) => {
        alert("Email sent, please check you inbox/spam");
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{ margin: 30, alignItems: "center" }}>
      <Image
        source={require("../assets/bread.png")}
        style={{ width: 100, height: 100 }}
      ></Image>
      <View>
        <Text
          style={{
            fontFamily: "Questrial",
            fontWeight: "1000",
            fontSize: "30px",
            marginBottom: 15,
            textAlign: "center",
          }}
        >
          Oops...
        </Text>
        <Text
          style={{
            fontFamily: "Questrial",
            fontSize: "16px",
            textAlign: "center",
            lineHeight: "1.4",
            marginBottom: 15,
          }}
        >
          Your email hasn't been verified yet. Here is some bread.
        </Text>
      </View>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => verify()}
      >
        Verify Email
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => onLogout()}
      >
        Logout
      </Button>
    </View>
  );
}
const useStyles = makeStyles((theme) => ({
  button: {
    fontFamily: "Questrial",
    fontWeight: "600",
    backgroundColor: "#FFCD29",
    marginBottom: 20,
  },
}));
