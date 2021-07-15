import React, { Component } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import firebase from "firebase";
import { validateAll } from "indicative/validator";
import "firebase/firestore";
import { style } from "@material-ui/system";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      password_confirmation: "",
      city: "null",
      province: "null",
      error: {},
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
      "firstname.required": "Name field cannot be empty",
      "lastname.required": "Name field cannot be empty",
      "email.required": "Email cannot be empty",
      "password.required": "Password cannot be empty",
      "email.email": "The email syntax is incorrect",
      "password.confirmed": "The password did not match",
      "password.min": "The password is too short",
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

  onSignUp() {
    const { email, password, firstname, lastname, city, province } = this.state;
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
    return (
      <ImageBackground
        source={require("../assets/gluten-free-background.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.screenContainer}>
          {this.state.error["firstname"] && (
            <Text
              style={{
                fontSize: 15,
                color: "red",
                marginBottom: 2,
                paddingLeft: 10,
              }}
            >
              {this.state.error["firstname"]}
            </Text>
          )}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              placeholder="First name"
              placeholderTextColor="black"
              onChangeText={(firstname) => this.setState({ firstname })}
            />
            <View style={styles.space}></View>
            <TextInput
              style={styles.textBox}
              placeholder="Last name"
              placeholderTextColor="black"
              onChangeText={(lastname) => this.setState({ lastname })}
            />
          </View>
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
              style={styles.eBox}
              placeholder="E-mail"
              placeholderTextColor="black"
              onChangeText={(email) => this.setState({ email })}
            />
            <View style={styles.space}></View>
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
          {this.state.error["password_confirmation"] && (
            <Text
              style={{
                fontSize: 15,
                color: "red",
                marginBottom: 2,
                paddingLeft: 10,
              }}
            >
              {this.state.error["password_confirmation"]}
            </Text>
          )}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
            />
            <View style={styles.space}></View>
            <TextInput
              style={styles.textBox}
              placeholder="Confirm Password"
              placeholderTextColor="black"
              secureTextEntry={true}
              onChangeText={(password_confirmation) =>
                this.setState({ password_confirmation })
              }
            />
          </View>

          <View style={styles.textBoxView}>
            <Picker
              style={styles.picker}
              onValueChange={(city) => this.setState({ city })}
            >
              <Picker.Item label="City"> City </Picker.Item>
              <Picker.Item label="Barrie">Barrie </Picker.Item>
              <Picker.Item label="Belleville">Belleville</Picker.Item>
              <Picker.Item label="Brampton">Brampton</Picker.Item>
              <Picker.Item label="Brant">Brant</Picker.Item>
              <Picker.Item label="Brantford">Brantford</Picker.Item>
              <Picker.Item label="Brockville">Brockville</Picker.Item>
              <Picker.Item label="Burlington">Burlington</Picker.Item>
              <Picker.Item label="Cambridge">Cambridge</Picker.Item>
              <Picker.Item label="Clarence-Rockland">
                Clarence-Rockland
              </Picker.Item>
              <Picker.Item label="Cornwall">Cornwall</Picker.Item>
              <Picker.Item label="Dryden">Dryden</Picker.Item>
              <Picker.Item label="Elliot Lake">Elliot Lake</Picker.Item>
              <Picker.Item label="Greater Sudbury">Greater Sudbury</Picker.Item>
              <Picker.Item label="Guelph">Guelph</Picker.Item>
              <Picker.Item label="Haldimand County">
                Haldimand County
              </Picker.Item>
              <Picker.Item label="Hamilton">Hamilton</Picker.Item>
              <Picker.Item label="Kawartha Lakes">Kawartha Lakes</Picker.Item>
              <Picker.Item label="Kenora">Kenora</Picker.Item>
              <Picker.Item label="Kingston">Kingston</Picker.Item>
              <Picker.Item label="Kitchener">Kitchener</Picker.Item>
              <Picker.Item label="London">London</Picker.Item>
              <Picker.Item label="Markham">Markham</Picker.Item>
              <Picker.Item label="Mississauga">Mississauga</Picker.Item>
              <Picker.Item label="Niagara Falls">Niagara Falls</Picker.Item>
              <Picker.Item label="Norfolk County">Norfolk County</Picker.Item>
              <Picker.Item label="North Bay">North Bay</Picker.Item>
              <Picker.Item label="Orillia">Orillia</Picker.Item>
              <Picker.Item label="Oshawa">Oshawa</Picker.Item>
              <Picker.Item label="Ottawa">Ottawa</Picker.Item>
              <Picker.Item label="Owen Sound">Owen Sound</Picker.Item>
              <Picker.Item label="Pembroke">Pembroke</Picker.Item>
              <Picker.Item label="Peterborough">Peterborough</Picker.Item>
              <Picker.Item label="Pickering">Pickering</Picker.Item>
              <Picker.Item label="Port Colborne">Port Colborne</Picker.Item>
              <Picker.Item label="Prince Edward County">
                Prince Edward County
              </Picker.Item>
              <Picker.Item label="Quinte West">Quinte West</Picker.Item>
              <Picker.Item label="Richmond Hill">CRichmond Hillity</Picker.Item>
              <Picker.Item label="Sarnia">Sarnia</Picker.Item>
              <Picker.Item label="Sault Ste. Marie">
                Sault Ste. Marie
              </Picker.Item>
              <Picker.Item label="St. Catharines">St. Catharines</Picker.Item>
              <Picker.Item label="St. Thomas">St. Thomas</Picker.Item>
              <Picker.Item label="Stratford">Stratford</Picker.Item>
              <Picker.Item label="Temiskaming Shores">
                Temiskaming Shores
              </Picker.Item>
              <Picker.Item label="Thorold">Thorold</Picker.Item>
              <Picker.Item label="Thunder Bay">Thunder Bay</Picker.Item>
              <Picker.Item label="Timmins">Timmins</Picker.Item>
              <Picker.Item label="Toronto">Toronto</Picker.Item>
              <Picker.Item label="Vaughan">Vaughan</Picker.Item>
              <Picker.Item label="Waterloo">Waterloo</Picker.Item>
              <Picker.Item label="Welland">Welland</Picker.Item>
              <Picker.Item label="Windsor">Windsor</Picker.Item>
              <Picker.Item label="Woodstock">Woodstock</Picker.Item>
            </Picker>
            <View style={styles.space}></View>
            <Picker
              style={styles.picker}
              onValueChange={(province) => this.setState({ province })}
            >
              <Picker.Item label="Province"> City </Picker.Item>
              <Picker.Item label="Alberta">Alberta </Picker.Item>
              <Picker.Item label="British Columbia">
                British Columbia
              </Picker.Item>
              <Picker.Item label="Manitoba">Manitoba</Picker.Item>
              <Picker.Item label="New Brunswick">New Brunswick</Picker.Item>
              <Picker.Item label="Newfoundland and Labrador">
                Newfoundland and Labrador
              </Picker.Item>
              <Picker.Item label="Northwest Territories">
                Northwest Territories
              </Picker.Item>
              <Picker.Item label="Nova Scotia">Nova Scotia</Picker.Item>
              <Picker.Item label="Nunavut">Nunavut</Picker.Item>
              <Picker.Item label="Ontario">Ontario</Picker.Item>
              <Picker.Item label="Prince Edward Island">
                Prince Edward Island
              </Picker.Item>
              <Picker.Item label="Quebec">Quebec</Picker.Item>
              <Picker.Item label="Saskatchewan">Saskatchewan</Picker.Item>
              <Picker.Item label="Yukon">Yukon</Picker.Item>
            </Picker>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => this.validate(this.state)}>
              <Text style={styles.textElement}>Sign up</Text>
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
    width: 20,
    height: 10,
  },
  textBoxView: {
    flexDirection: "row",
    marginBottom: 40,
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
    height: 58,
    width: 190,
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
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

export default Register;
