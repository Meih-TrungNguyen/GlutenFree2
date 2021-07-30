import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { validateAll } from "indicative/validator";
import firebase from "firebase";

export class EditAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentpassword: "",
      newpassword: "",
      email: "",
      error: {},
    };
  }

  onLogout() {
    firebase.auth().signOut();
  }

  reauthenticate(currentpassword) {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentpassword
    );
    return user.reauthenticateWithCredential(cred);
  }

  onPasswordChange() {
    const { currentpassword, newpassword } = this.state;
    this.reauthenticate(currentpassword)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updatePassword(newpassword)
          .then(() => {
            alert("Password was changed");
          })
          .catch((error) => {
            if (error.code === "auth/weak-password") {
              alert("The password must be 6 characters long or more.");
            }
            console.log(error);
          });
      })
      .then(() => {
        this.onLogout();
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          alert("The password is invalid");
        }
        console.log(error);
      });
  }

  onEmailChange() {
    const { currentpassword, email } = this.state;
    this.reauthenticate(currentpassword)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateEmail(email)
          .then(() => {
            alert("Email was changed");
          })
          .catch((error) => {
            if (error.code === "auth/invalid-email") {
              alert("The email address is badly formatted.");
            }
            console.log(error);
          });
      })
      .then(() => {
        this.onLogout();
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          alert("The password is invalid");
        }
        console.log(error);
      });
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/Home-screen.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.screenContainer}>
          {this.state.error["currentpassword"] && (
            <Text
              style={{
                fontSize: 15,
                color: "red",
                marginBottom: 2,
                paddingLeft: 10,
              }}
            >
              {this.state.error["currentpassword"]}
            </Text>
          )}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              placeholder="Enter Current Password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(currentpassword) =>
                this.setState({ currentpassword })
              }
            />
          </View>
          {this.state.error["newpassword"] && (
            <Text
              style={{
                fontSize: 15,
                color: "red",
                marginBottom: 2,
                paddingLeft: 10,
              }}
            >
              {this.state.error["newpassword"]}
            </Text>
          )}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              placeholder="Enter New Password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(newpassword) => this.setState({ newpassword })}
            />
          </View>

          <View style={styles.space} />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => this.onPasswordChange()}>
              <Text style={styles.textElement}>Change Password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />

          {this.state.error["email"] && (
            <Text
              style={{
                fontSize: 15,
                color: "red",
                marginBottom: 2,
                paddingLeft: 10,
              }}
            >
              {this.state.error["email"]}
            </Text>
          )}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              placeholder="Enter New Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>

          <View style={styles.space} />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => this.onEmailChange()}>
              <Text style={styles.textElement}>Change Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 200,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttons: {
    backgroundColor: "lightgrey",
    fontSize: 200,
    height: 50,
    width: 260,
  },
  space: {
    width: 20,
    height: 10,
  },
  textBoxView: {
    flexDirection: "row",
    marginBottom: 20,
  },
  textBox: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 30,
    backgroundColor: "white",
    shadowColor: "#000",
    flex: 1,
    borderWidth: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  textElement: {
    fontSize: 25,
    marginTop: 8,
    textAlign: "center",
    color: "black",
  },
});
export default EditAuth;
