import React, { Component } from "react";
import {
  View,
  Button,
  Picker,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
// import { Picker } from "@react-native-picker/picker";
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
              placeholder="Email Address"
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
          <View style={styles.testView}>
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
          <View style={styles.pickerView}>
            <Picker
              style={styles.picker}
              selectedValue={ this.state.city }
              onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}>
              <Picker.Item label="City" value = " City "/>
              <Picker.Item label="Barrie" value = "Barrie "/>
              <Picker.Item label="Belleville" value = "Belleville"/>
              <Picker.Item label="Brampton" value = "Brampton"/>
              <Picker.Item label="Brant" value = "Brant"/>
              <Picker.Item label="Brantford" value = "Brantford"/>
              <Picker.Item label="Brockville" value = "Brockville"/>
              <Picker.Item label="Burlington" value = "Burlington"/>
              <Picker.Item label="Cambridge" value = "Cambridge"/>
              <Picker.Item label="Clarence-Rockland" value = "Clarence-Rockland"/>
              <Picker.Item label="Cornwall" value = "Cornwall"/>
              <Picker.Item label="Dryden" value = "Dryden"/>
              <Picker.Item label="Elliot Lake" value = "Elliot Lake"/>
              <Picker.Item label="Greater Sudbury" value = "Greater Sudbury"/>
              <Picker.Item label="Guelph" value = "Guelph"/>
              <Picker.Item label="Haldimand County" value = "Haldimand County"/>
              <Picker.Item label="Hamilton" value = "Hamilton"/>
              <Picker.Item label="Kawartha Lakes" value = "Kawartha Lakes"/>
              <Picker.Item label="Kenora" value = "Kenora"/>
              <Picker.Item label="Kingston" value = "Kingston"/>
              <Picker.Item label="Kitchener" value = "Kitchener"/>
              <Picker.Item label="London" value = "London"/>
              <Picker.Item label="Markham" value = "Markham"/>
              <Picker.Item label="Mississauga" value = "Mississauga"/>
              <Picker.Item label="Niagara Falls" value = "Niagara Falls"/>
              <Picker.Item label="Norfolk County" value = "Norfolk County"/>
              <Picker.Item label="North Bay" value = "North Bay"/>
              <Picker.Item label="Orillia" value = "Orillia"/>
              <Picker.Item label="Oshawa" value = "Oshawa"/>
              <Picker.Item label="Ottawa" value = "Ottawa"/>
              <Picker.Item label="Owen Sound" value = "Owen Sound"/>
              <Picker.Item label="Pembroke" value = "Pembroke"/>
              <Picker.Item label="Peterborough" value = "Peterborough"/>
              <Picker.Item label="Pickering" value = "Pickering"/>
              <Picker.Item label="Port Colborne" value = "Port Colborne"/>
              <Picker.Item label="Prince Edward C." value = "Prince Edward County"/>
              <Picker.Item label="Quinte West" value = "Quinte West"/>
              <Picker.Item label="Richmond Hill" value = "CRichmond Hillity"/>
              <Picker.Item label="Sarnia" value = "Sarnia"/>
              <Picker.Item label="Sault Ste. Marie" value = "Sault Ste. Marie"/>
              <Picker.Item label="St. Catharines" value = "St. Catharines"/>
              <Picker.Item label="St. Thomas" value = "St. Thomas"/>
              <Picker.Item label="Stratford" value = "Stratford"/>
              <Picker.Item label="Temiskaming Shores" value = "Temiskaming Shores"/>
              <Picker.Item label="Thorold" value = "Thorold"/>
              <Picker.Item label="Thunder Bay" value = "Thunder Bay"/>
              <Picker.Item label="Timmins" value = "Timmins"/>
              <Picker.Item label="Toronto" value = "Toronto"/>
              <Picker.Item label="Vaughan" value = "Vaughan"/>
              <Picker.Item label="Waterloo" value = "Waterloo"/>
              <Picker.Item label="Welland" value = "Welland"/>
              <Picker.Item label="Windsor" value = "Windsor"/>
              <Picker.Item label="Woodstock" value = "Woodstock"/>
            </Picker>
            
            <View style={styles.space}></View>
            <Picker
              style={styles.picker}
              selectedValue={ this.state.province }
              onValueChange={(itemValue, itemIndex) => this.setState({province: itemValue})}>
            
              <Picker.Item label="Province"/>
              <Picker.Item label="Alberta" value="Alberta"/>
              <Picker.Item label="British Columbia"value="British Columbia"/>
              <Picker.Item label="Manitoba" value="Manitoba"/>
              <Picker.Item label="New Brunswick"value="New Brunswick"/>
              <Picker.Item label="N.L"value="Newfoundland and Labrador"/>
              <Picker.Item label="N.W.T."value="Northwest Territories"/>
              <Picker.Item label="Nova Scotia"value="Nova Scotia"/>
              <Picker.Item label="Nunavut"value="Nunavut"/>
              <Picker.Item label="Ontario" value="Ontario"/>
              <Picker.Item label="P.E.I"value="Prince Edward Island"/>
              <Picker.Item label="Quebec" value="Quebec"/>
              <Picker.Item label="Saskatchewan" value="Saskatchewan"/>
              <Picker.Item label="Yukon" value="Yukon"/>
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
  pickerView: {
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
  picker:{
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

export default Register;
