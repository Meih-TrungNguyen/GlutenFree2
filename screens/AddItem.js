import React, { Component } from "react";
import { SearchBar } from "react-native-elements";
import firebase from "firebase";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  ImageBackground,
  StyleSheet,
} from "react-native";
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
      glutenSwitch:false,
      taxSwitch:false,
      medSwitch:false,
    };
  }

  counter = 0;

  updateSearch = (search) => {
    this.setState({ search });
  };



  GlutenSwitch = (value) => {
    if(this.state.glutenSwitch){
        this.setState({glutenSwitch: false})
    }
    else{
        this.setState({glutenSwitch: true})
    }
  }
  TaxSwitch = (value) => {
      if(this.state.taxSwitch){
          this.setState({taxSwitch: false})
      }
      else{
          this.setState({taxSwitch: true})
      }
  }
  MedSwitch = (value) => {
      if(this.state.medSwitch){
          this.setState({medSwitch: false})
      }
      else{
          this.setState({medSwitch: true})
      }
  }
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

  /**this function validate the Enter Item name to be only alphabetic,
   * submmit the input to the database
   */
  addItemToCart() {
    alert("Added");
    this.counter += 1;
    const { name, price, consumer, quantity } = this.state;
    console.log(
      "name: " +
        name +
        " price: " +
        price +
        " consumer: " +
        consumer +
        " quantity: " +
        quantity
    );
    const cart = {
      name,
      price,
      consumer,
      quantity,
    };

    firebase
      .database()
      .ref("User/" + firebase.auth().currentUser.uid + "/Product")
      .child("Product" + this.counter)
      .set(cart)
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { search } = this.state;
    return (
      <ImageBackground
        source={require("../assets/Home-screen.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.screenContainer}>
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

          {/* item name field */}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              placeholder={"Enter Item name"}
              onChangeText={(text) => this.setState({ name: text })}
              onBlur={() => this.nameValidator()}
            />
          </View>
          <Text style={{ color: "red" }}>{this.state.nameError}</Text>

          {/* price field */}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              placeholder={"Enter price"}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ price: text })}
            />
          </View>

          {/* switch glutten free*/}
          <View style={styles.switchTextBox}>
            <Text style={styles.font}>Gluten Free</Text>
            <View style={styles.switchButton}>
            <Switch 
                onValueChange={this.GlutenSwitch}
                value={this.state.glutenSwitch}
                /> 
            </View>
          </View>
          {/* consumers field */}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              keyboardType="numeric"
              placeholder={"Number of consumers"}
              maxLength={1}
              value={this.state.consumer}
              onChangeText={(text) => this.setState({ consumer: text })}
            />
          </View>
          {/* quantity field */}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              placeholder={"Quantity"}
              maxLength={2}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ quantity: text })}
            />
          </View>

          {/* switch taxable*/}
          <View style={styles.switchTextBox}>
            <Text style={styles.font}>Taxable</Text>
            <View style={styles.switchButton}>
              <Switch 
                  onValueChange={this.TaxSwitch}
                  value={this.state.taxSwitch}
                  /> 
            </View>
          </View>

          {/* switch Medical Expenses*/}
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
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => this.addItemToCart()}>
                <Text style={styles.textElement}>Save</Text>
              </TouchableOpacity>
            </View>
            {/* cancel button*/}
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("NewCart")}
                title="Go NewCart"
              >
                <Text style={styles.textElement}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  buttons: {
    backgroundColor: "lightgrey",
    color: "white",
    fontSize: 200,
    height: 50,
    width: 190,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  space: {
    width: 20,
    height: 10,
  },
  font: {
    fontSize: 25,
    justifyContent: "flex-start",
  },
  textBoxView: {
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  topView: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    fontSize: 25,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },

  switchButton: {
    alignSelf: "flex-end",
  },

  switchTextBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 8,
  },
  textElement: {
    fontSize: 25,
    marginTop: 8,
    textAlign: "center",
  },
  topText: {
    fontSize: 35,
    marginTop: 20,
    textAlign: "center",
    color: "black",
  },
});
