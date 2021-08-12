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

/**Class Login responsible to show a screen to log into the App,
 * boxes for email and password.
 */
export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: {},
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  // validattion for email and password
  validate = async (data) => {
    const rules = {
      email: "required|email",
      password: "required|string",
    };

    const message = {
      "email.required": "Email cannot be empty",
      "password.required": "Password cannot be empty",
    };
    try {
      await validateAll(data, rules, message).then(() => this.onSignUp());
    } catch (errors) {
      const formattedErrors = {};
      console.log("=====", errors.response);

      if (errors.response && errors.response.status === 422) {
        formattedErrors["email"] = errors.response.data["email"][0];
        this.setState({
          error: formattedErrors,
        });
      } else {
        errors.forEach(
          (error) => (formattedErrors[error.field] = error.message)
        );

        this.setState({
          error: formattedErrors,
        });
      }
    }
  };

  // verification for password amd email with the
  // database (firebase)
  onSignUp() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)

      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("The email has not been registered");
        }

        if (error.code === "auth/wrong-password") {
          alert("Incorrect password");
        }

        if (error.code === "auth/invalid-email") {
          alert("Enter a valid email");
        }
        console.log(error);
      });
  }

  // render is a function that tell what to display
  // on the Login screen. every component will 
  // have a title to describe them.
  render() {
    return (
      <ImageBackground
        source={require("../assets/gluten-free-background.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.textcontainer}>
          <Text style={styles.topText}>LOGIN TO YOUR ACCOUNT</Text>
        </View>
        <View style={styles.screenContainer}>
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
          {/* Enter Email */}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              placeholder="Enter Email"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>
          {this.state.error["password"] && (
            <Text
              style={{
                fontSize: 15,
                color: "red",
                marginBottom: 2,
                paddingLeft: 10,
              }}
            >
              {this.state.error["password"]}
            </Text>
          )}
          {/* Enter Password */}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              placeholder="Enter Password"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => this.validate()}>
              <Text style={styles.textElement}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 25 }} />
          <Text
            onPress={() => this.props.navigation.navigate("Forgot Password")}
            style={{ color: "##0000FF", fontSize: 18 }}
          >
            Forgot Password?.
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

// Styling for screen
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
  textcontainer: {
    alignItems: "center",
    marginTop: 20,
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
    width: 200,
  },
  space: {
    width: 20,
    height: 10,
  },
  textBoxView: {
    flexDirection: "row",
    marginBottom: 20,
    paddingVertical: 10,
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
  },
  topText: {
    color: "brown",
    justifyContent: "center",
    fontSize: 25,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
export default Login;
