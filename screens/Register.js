import React, { Component } from "react";
import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { Text } from "react-native";
import { View, StyleSheet } from "react-native";
import firebase from "firebase";
import { validateAll } from "indicative/validator";
import { withStyles } from "@material-ui/styles";
import { useFonts } from "@expo-google-fonts/raleway";

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
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  validate = async (data) => {
    const rules = {
      firstname: "required|string",
      lastname: "required|string",
      email: "required|email",
      password: "required|string|min:6|confirmed",
    };

    const message = {
      "firstname.required": "First name is required",
      "lastname.required": "Last name is required",
      "email.required": "Email is required",
      "password.required": "Password is required",
      "email.email": "The email syntax is incorrect",
      "password.confirmed": "The password does not match",
      "password.min": "The password should be longer than 6 characters",
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
        console.log(this.state);
      }
    }
  };

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
        console.log(error);
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
          <TextField
            id="password"
            label="Password"
            placeholder="Enter password"
            variant="outlined"
            onChange={(event) => {
              const { value } = event.target;
              this.setState({ password: value });
            }}
            error={!!this.state.error["password"]}
            helperText={this.state.error["password"]}
            size="small"
            className={classes.textField}
          />
          <TextField
            id="password2"
            label="Password Confirmation"
            placeholder="Password Confirmation"
            variant="outlined"
            onChange={(event) => {
              const { value } = event.target;
              this.setState({ password_confirmation: value });
            }}
            size="small"
            className={classes.textField}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <FormControl className={classes.formControl}>
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
              <MenuItem value={"Richmond Hill"}>CRichmond Hillity</MenuItem>
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
          <FormControl className={classes.formControl}>
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttons: {
    backgroundColor: "grey",
    fontSize: 200,
    height: 50,
    width: 200,
  },
  space: {
    width: 0,
    height: 10,
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
  eBox: {
    height: 60,
    width: 410,
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
  picker: {
    width: 190,
    height: 200,
    marginHorizontal: 8,
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
    color: "white",
  },
});
