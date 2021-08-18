import React, { Component } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  InputLabel,
  FormControl,
  IconButton,
  OutlinedInput,
} from "@material-ui/core";
import { Text } from "react-native";
import { View, StyleSheet } from "react-native";
import firebase from "firebase";
import { validateAll } from "indicative/validator";
import { withStyles } from "@material-ui/styles";
import * as Font from "expo-font";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import "firebase/firestore";

const styling = (theme) => ({
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 60,
    fontFamily: "Questrial",
    fontWeight: "600",
    backgroundColor: "#FFCD29",
  },
  flexRowTextField: {
    marginRight: 10,
    marginBottom: 10,
  },
  textField: {
    marginBottom: 10,
  },
  formControl: {
    minWidth: 157,
    height: 50,
  },
  selectEmpty: {
    marginRight: 10,
  },
});

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      password_confirmation: "",
      city: "city",
      province: "province",
      error: {},
      cart: 0,
      showPassword: false,
    };

    this.onSignUp = this.onSignUp.bind(this);
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
      firstname: "required|string",
      lastname: "required|string",
      email: "required|email",
      password: "required|string|min:6|confirmed",
    };

    const message = {
      "firstname.required": "Name is required",
      "lastname.required": "Name is required",
      "email.required": "Email is required",
      "password.required": "Password is required",
      "email.email": "Email syntax is incorrect",
      "password.confirmed": "The password does not match",
      "password.min": "Password should be longer than 6 characters",
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
  /**
   * Sign Up for new User, create a new user in the Database as well as saving their input data.
   */
  onSignUp() {
    const { email, password, firstname, lastname, city, province, cart } =
      this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = {
          firstname,
          lastname,
          email,
          city,
          province,
          cart,
        };
        firebase
          .database()
          .ref("User")
          .child(firebase.auth().currentUser.uid)
          .set(user);
      })
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification;
      })
      .catch((error) => {
        const formattedErrors = {};
        if (error.code === "auth/email-already-in-use") {
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
      <View style={{ flex: 1, margin: 30 }}>
        <Text
          style={{
            fontWeight: "1000",
            fontSize: "30px",
            fontFamily: "Questrial",
          }}
        >
          Sign Up
        </Text>
        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <TextField
            id="fname"
            label="First name"
            placeholder="First name"
            variant="outlined"
            onChange={(event) => {
              const { value } = event.target;
              this.setState({ firstname: value });
            }}
            error={!!this.state.error["firstname"]}
            helperText={this.state.error["firstname"]}
            size="small"
            className={classes.flexRowTextField}
          />
          <TextField
            id="lname"
            label="Last name"
            placeholder="Last name"
            variant="outlined"
            onChange={(event) => {
              const { value } = event.target;
              this.setState({ lastname: value });
            }}
            error={!!this.state.error["lastname"]}
            helperText={this.state.error["lastname"]}
            size="small"
            className={classes.textField}
          />
        </View>
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
          className={classes.textField}
        />

        <View>
          <FormControl
            className={classes.textField}
            variant="outlined"
            size="small"
            error={!!this.state.error["password"]}
            helperText={this.state.error["password"]}
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
          <FormControl
            className={classes.textField}
            variant="outlined"
            size="small"
          >
            <InputLabel htmlFor="password2">Confirm Password</InputLabel>
            <OutlinedInput
              id="password2"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password_confirmation}
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ password_confirmation: value });
              }}
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
        <View style={{ flexDirection: "row" }}>
          <FormControl className={classes.formControl} size="small">
            <Select
              variant="outlined"
              value={this.state.city}
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ city: value });
              }}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                City
              </MenuItem>
              <MenuItem value={"Barrie"}>Barrie</MenuItem>
              <MenuItem value={"Belleville"}>Belleville</MenuItem>
              <MenuItem value={"Brampton"}>Brampton</MenuItem>
              <MenuItem value={"Brant"}>Brant</MenuItem>
              <MenuItem value={"Brantford"}>Brantford</MenuItem>
              <MenuItem value={"Brockville"}>Brockville</MenuItem>
              <MenuItem value={"Burlington"}>Burlington</MenuItem>
              <MenuItem value={"Cambridge"}>Cambridge</MenuItem>
              <MenuItem value={"Clarence-Rockland"}>Clarence-Rockland</MenuItem>
              <MenuItem value={"Cornwall"}>Cornwall</MenuItem>
              <MenuItem value={"Dryden"}>Dryden</MenuItem>
              <MenuItem value={"Elliot Lake"}>Elliot Lake</MenuItem>
              <MenuItem value={"Greater Sudbury"}>Greater Sudbury</MenuItem>
              <MenuItem value={"Guelph"}>Guelph</MenuItem>
              <MenuItem value={"Haldimand County"}>Haldimand County</MenuItem>
              <MenuItem value={"Hamilton"}>Hamilton</MenuItem>
              <MenuItem value={"Kawartha Lakes"}>Kawartha Lakes</MenuItem>
              <MenuItem value={"Kenora"}>Kenora</MenuItem>
              <MenuItem value={"Kingston"}>Kingston</MenuItem>
              <MenuItem value={"Kitchener"}>Kitchener</MenuItem>
              <MenuItem value={"London"}>London</MenuItem>
              <MenuItem value={"Markham"}>Markham</MenuItem>
              <MenuItem value={"Mississauga"}>Mississauga</MenuItem>
              <MenuItem value={"Niagara Falls"}>Niagara Falls</MenuItem>
              <MenuItem value={"Norfolk County"}>Norfolk County</MenuItem>
              <MenuItem value={"North Bay"}>North Bay</MenuItem>
              <MenuItem value={"Orillia"}>Orillia</MenuItem>
              <MenuItem value={"Oshawa"}>Oshawa</MenuItem>
              <MenuItem value={"Ottawa"}>Ottawa</MenuItem>
              <MenuItem value={"Owen Sound"}>Owen Sound</MenuItem>
              <MenuItem value={"Pembroke"}>Pembroke</MenuItem>
              <MenuItem value={"Peterborough"}>Peterborough</MenuItem>
              <MenuItem value={"Pickering"}>Pickering</MenuItem>
              <MenuItem value={"Port Colborne"}>Port Colborne</MenuItem>
              <MenuItem value={"Prince Edward C."}>
                Prince Edward County
              </MenuItem>
              <MenuItem value={"Quinte West"}>Quinte West</MenuItem>
              <MenuItem value={"Richmond Hill"}>Richmond Hill</MenuItem>
              <MenuItem value={"Sarnia"}>Sarnia</MenuItem>
              <MenuItem value={"Sault Ste. Marie"}>Sault Ste. Marie</MenuItem>
              <MenuItem value={"St. Catharines"}>St. Catharines</MenuItem>
              <MenuItem value={"St. Thomas"}>St. Thomas</MenuItem>
              <MenuItem value={"Stratford"}>Stratford</MenuItem>
              <MenuItem value={"Temiskaming Shores"}>
                Temiskaming Shores
              </MenuItem>
              <MenuItem value={"Thorold"}>Thorold</MenuItem>
              <MenuItem value={"Thunder Bay"}>Thunder Bay</MenuItem>
              <MenuItem value={"Timmins"}>Timmins</MenuItem>
              <MenuItem value={"Toronto"}>Toronto</MenuItem>
              <MenuItem value={"Vaughan"}>Vaughan</MenuItem>
              <MenuItem value={"Waterloo"}>Waterloo</MenuItem>
              <MenuItem value={"Welland"}>Welland</MenuItem>
              <MenuItem value={"Windsor"}>Windsor</MenuItem>
              <MenuItem value={"Woodstock"}>Woodstock</MenuItem>
            </Select>
            <FormHelperText>City</FormHelperText>
          </FormControl>

          <View style={styles.space}></View>
          <FormControl className={classes.formControl} size="small">
            <Select
              variant="outlined"
              value={this.state.province}
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ province: value });
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                Province
              </MenuItem>
              <MenuItem value={"Alberta"}>Alberta</MenuItem>
              <MenuItem value={"British Columbia"}>British Columbia</MenuItem>
              <MenuItem value={"Manitoba"}>Manitoba</MenuItem>
              <MenuItem value={"New Brunswick"}>New Brunswick</MenuItem>
              <MenuItem value={"N.L"}>Newfoundland and Labrador</MenuItem>
              <MenuItem value={"N.W.T."}>Northwest Territories</MenuItem>
              <MenuItem value={"Nova Scotia"}>Nova Scotia</MenuItem>
              <MenuItem value={"Nunavut"}>Nunavut</MenuItem>
              <MenuItem value={"Ontario"}>Ontario</MenuItem>
              <MenuItem value={"P.E.I"}>Prince Edward Island</MenuItem>
              <MenuItem value={"Quebec"}>Quebec</MenuItem>
              <MenuItem value={"Saskatchewan"}>Saskatchewan</MenuItem>
              <MenuItem value={"Yukon"}>Yukon</MenuItem>
            </Select>
            <FormHelperText>Province</FormHelperText>
          </FormControl>
        </View>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => this.validate(this.state)}
        >
          Sign Up
        </Button>
      </View>
    );
  }
}

export default withStyles(styling)(Register);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },

  textBoxView: {
    flexDirection: "row",
    marginBottom: 40,
  },
  testView: {
    flexDirection: "row",
    marginBottom: 20,
  },
  textBox: {
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "white",
    color: "black",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  textElement: {
    fontSize: 25,
    marginTop: 8,
    textAlign: "center",
    color: "white",
  },
});
