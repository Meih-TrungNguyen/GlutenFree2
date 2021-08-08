import React, { Component } from "react";
import { SearchBar } from "react-native-elements";
import firebase from "firebase";

import {KeyboardAvoidingView, Text, Platform, 
  TouchableWithoutFeedback, Button, Keyboard  , View,  TouchableOpacity,  StatusBar,
  TextInput,  Switch,  ImageBackground,  StyleSheet, ScrollView} from "react-native";
import {
  Ionicons,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: "",
      price: "",
      consumer: "1",
      quantity: "",
      search: "",
      glutenSwitch: false,
      taxSwitch: false,
      medSwitch: false,
    };
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  GlutenSwitch = (value) => {
    if (this.state.glutenSwitch) {
      this.setState({ glutenSwitch: false });
    } else {
      this.setState({ glutenSwitch: true });
    }
  };
  TaxSwitch = (value) => {
    if (this.state.taxSwitch) {
      this.setState({ taxSwitch: false });
    } else {
      this.setState({ taxSwitch: true });
    }
  };
  MedSwitch = (value) => {
    if (this.state.medSwitch) {
      this.setState({ medSwitch: false });
    } else {
      this.setState({ medSwitch: true });
    }
  };

  /**this function validate the ItemName field,
   * it can not be EMPTY, and only contains letters
   */
  nameValidator() {
    let rjx = /^[a-zA-Z]+$/;
    let isValid = rjx.test(this.state.name);
    console.warn(isValid);
    if (this.state.name == "") {
      this.setState({ nameError: "Field can not be Empty" });
    } else if (!isValid) {
      this.setState({ nameError: "Name field could only contains letters" });
    } else {
      this.setState({ nameError: "" });
    }
  }

  counter = 0;
  /**this function validate the Enter Item name to be only alphabetic,
   * submmit the input to the database
   */
  addItemToCart() {
    const { cartNumber } = this.props.route.params;

    alert("Added");
    this.counter += 1;
    const {
      name,
      price,
      consumer,
      quantity,
      glutenSwitch,
      taxSwitch,
      medSwitch,
    } = this.state;
    const cart = {
      name,
      price,
      consumer,
      quantity,
      glutenSwitch,
      taxSwitch,
      medSwitch,
    };
    this.props.navigation.navigate("NewCart")

    firebase
      .database()
      .ref(
        "User/" +
          firebase.auth().currentUser.uid +
          "/Carts/Cart " +
          cartNumber +
          "/Products"
      )
      .child("Product " + this.counter)
      .set(cart)
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { search } = this.state;
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={require("../assets/Home-screen.jpg")}
        style={styles.backgroundImage}
      >
          <View style={styles.topView}>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("NewCart")}
                title="Go NewCart"
              >
                <AntDesign name="close" size={50} color="darkgreen" />
              </TouchableOpacity>
            </View>
            <Text style={styles.textElement}>Add Items</Text>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ViewCart")}
                title="Go ViewCart"
              >
                <AntDesign name="shoppingcart" size={50} color="darkgreen" />
              </TouchableOpacity>
            </View>
          </View>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
          />
    <ScrollView style={styles.scrollView}>
        <View style={styles.inner}>
        <TextInput
              style={styles.textInput}
              placeholder={"Enter Item name"}
              placeholderTextColor='black'
              onChangeText={(text) => this.setState({ name: text })}
              onBlur={() => this.nameValidator()}
            />
          <TextInput
              style={styles.textInput}
              placeholder={"Enter price"}
              placeholderTextColor='black'
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ price: text })}
            />
          <View style={styles.switchTextBox}>
            <Text style={styles.font}>Gluten Free</Text>
            <View style={styles.switchButton}>
              <Switch
                onValueChange={this.GlutenSwitch}
                value={this.state.glutenSwitch}
              />
            </View>
          </View>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder={"Number of consumers"}
              placeholderTextColor='black'
              maxLength={1}
              value={this.state.consumer}
              onChangeText={(text) => this.setState({ consumer: text })}
            />
            <TextInput
              style={styles.textInput}
              placeholder={"Quantity"}
              placeholderTextColor='black'
              maxLength={2}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ quantity: text })}
            />
          <View style={styles.switchTextBox}>
            <Text style={styles.font}>Taxable</Text>
            <View style={styles.switchButton}>
              <Switch
                onValueChange={this.TaxSwitch}
                value={this.state.taxSwitch}
              />
            </View>
          </View>        
          <View style={styles.switchTextBox}>
            <Text style={styles.font}>Medical Expense</Text>
            <View style={styles.switchButton}>
              <Switch
                onValueChange={this.MedSwitch}
                value={this.state.medSwitch}
              />
          </View>
          </View>

          
          <View style={styles.buttonView}>
              {/* save button*/}
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => this.addItemToCart()}>
                  <Text style={styles.textElement}>Save</Text>
                </TouchableOpacity>
              </View>
              {/* cancel button*/}
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("NewCart")}
                  title="Go NewCart"
                >
                  <Text style={styles.textElement}>Cancel</Text>
                </TouchableOpacity>
          </View>
          </View>
        </View>
      
      </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({

  scrollView: {
    marginHorizontal: 20,
  },  
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  font: {
    fontSize: 25,
    justifyContent: "flex-start",
    
  },
  textInput: {
    height: 50,
    borderColor: "#000000",
    backgroundColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  btnContainer: {
    backgroundColor: "grey",
    marginTop: 12,
    width: 150,
    height: 50
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 8,
    marginBottom: 80,
  },
  switchTextBox: {
    height: 50,
    borderColor: "#000000",
    backgroundColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },  
  textElement: {
    fontSize: 25,
    marginTop: 8,
    textAlign: "center",
  },
  topView: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
})