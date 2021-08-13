import React, { Component } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  InputLabel,
  FormControl,
  IconButton,
  OutlinedInput,
} from "@material-ui/core";
import { Text, View, StyleSheet } from "react-native";
import { validateAll } from "indicative/validator";
import * as Font from "expo-font";
import { withStyles } from "@material-ui/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import firebase from "firebase";

const styling = (theme) => ({
  button: {
    marginTop: 50,
    marginLeft: 70,
    marginRight: 70,
    fontFamily: "Questrial",
    fontWeight: "600",
    backgroundColor: "#FFCD29",
  },
  textBox: {
    marginBottom: 10,
  },
});

export class Login extends Component {
  constructor(props) {
    super(props);
    const { emailVerified } = this.props;
    console.log(emailVerified);
    this.state = {
      email: "",
      password: "",
      error: {},
      showPassword: false,
    };
    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {
    Font.loadAsync({
      Questrial: require("../assets/fonts/Questrial-Regular.ttf"),
    });
  }
  /**
   * Handle Click for the Password TextField, SHow/Hide Password
   */
  handleClickShowPassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };
  /**
   * Handle Click for the Password TextField, SHow/Hide Password
   */
  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /**
   * Validating data from user input
   * @param {this.state} data
   */
  validate = async (data) => {
    const rules = {
      email: "required|email",
      password: "required|string",
    };

    const message = {
      "email.required": "Email is required",
      "password.required": "Password is required",
      "email.email": "The email syntax is incorrect",
      "password.string": "The password is incorrect",
    };
    try {
      await validateAll(data, rules, message).then(() => this.onSignIn());
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
        console.log(this.state);
      }
    }
  };
  /**
   * Firebase Auth to sign user in. Navigate to Verify Email if the user is not Verified, else navigate to Home
   */
  onSignIn() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)

      .then((result) => {
        this.setState({
          error: {},
        });
      })
      .catch((error) => {
        const formattedErrors = {};
        if (error.code === "auth/user-not-found") {
          formattedErrors["email"] = error.message;
        }
        if (error.code === "auth/wrong-password") {
          formattedErrors["password"] = error.message;
        }
        this.setState({
          error: formattedErrors,
        });
      });
  }
  /**
   * render the UI
   * @returns View
   */
  render() {
    const { classes } = this.props;

    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <View style={styles.textcontainer}>
          <Text
            style={{
              fontFamily: "Questrial",
              fontWeight: "1000",
              fontSize: "30px",
              textAlign: "left",
              marginBottom: 15,
            }}
          >
            Let's sign you in.
          </Text>
          <Text
            style={{
              fontFamily: "Questrial",
              fontSize: "25px",
              textAlign: "left",
            }}
          >
            Welcome back.
          </Text>
          <Text
            style={{
              fontFamily: "Questrial",
              fontSize: "25px",
              textAlign: "left",
            }}
          >
            You've been missed!
          </Text>
        </View>
        <View style={styles.screenContainer}>
          <View style={styles.form}>
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
              className={classes.textBox}
              size="small"
            />
            <FormControl
              className={classes.textBox}
              variant="outlined"
              size="small"
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={(event) => {
                  const { value } = event.target;
                  this.setState({ password: value });
                }}
                error={!!this.state.error["password"]}
                helperText={this.state.error["password"]}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                      edge="end"
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </View>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => this.validate(this.state)}
          >
            Sign In
          </Button>
          <View style={{ height: 25 }} />
          <Text
            style={styles.forgotBtn}
            onClick={() => this.props.navigation.navigate("Forgot Password")}
          >
            Forgot password?
          </Text>
        </View>
      </View>
    );
  }
}

export default withStyles(styling)(Login);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 20,
  },
  textcontainer: {
    marginLeft: 30,
    lineHeight: 1.4,
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
  forgotBtn: {
    textAlign: "center",
    fontSize: "16px",
    color: "#1976D2",
    fontFamily: "Questrial",
  },
  form: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
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
