import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { validateAll } from "indicative/validator";
import { useFonts } from "@expo-google-fonts/raleway";
import { withStyles } from "@material-ui/styles";
import firebase from "firebase";

const styling = (theme) => ({
  button: {
    marginTop: "50px",
    fontFamily: "Questrial",
    fontWeight: "600",
    backgroundColor: "#FFCD29",
  },
});

export class PasswordRecover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      error: {},
    };

    this.forgotPassword = this.forgotPassword.bind(this);
  }

  /**
   * Validating data from user input
   * @param {this.state} data
   */
  validate = async (data) => {
    const rules = {
      email: "required|email",
    };

    const message = {
      "email.required": "Email cannot be empty",
      "email.email": "The email syntax is incorrect",
    };
    try {
      await validateAll(data, rules, message).then(() => this.forgotPassword());
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

  /**
   * Send an email to user to have them reset their Password
   */
  forgotPassword() {
    const { email } = this.state;
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((result) => {
        alert("Email sent, please check you inbox/spam");
        console.log(result);
      })
      .catch((error) => {
        const formattedErrors = {};
        if (error.code === "auth/user-not-found") {
          formattedErrors["email"] = error.message;
        }

        this.setState({
          error: formattedErrors,
        });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <View style={{ flex: 1, alignItems: "center", margin: 30 }}>
        <Image
          source={require("../assets/password.png")}
          style={styles.backgroundImage}
        ></Image>
        <View style={{ maginTop: 30 }}>
          <Text
            style={{
              fontFamily: "Questrial",
              fontWeight: "1000",
              fontSize: "30px",
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            Forgot password?
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
            We just need your registered email address to send you password
            reset
          </Text>
          <TextField
            id="email"
            label="Email"
            placeholder="Enter email"
            variant="outlined"
            value={this.state.email}
            onChange={(event) => {
              const { value } = event.target;
              this.setState({ email: value });
            }}
            error={!!this.state.error["email"]}
            helperText={this.state.error["email"]}
            size="small"
          />
        </View>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => this.validate(this.state)}
        >
          Reset Password
        </Button>
        <View></View>
      </View>
    );
  }
}

export default withStyles(styling)(PasswordRecover);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  backgroundImage: {
    width: 100,
    height: 100,
    alignItems: "center",
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
