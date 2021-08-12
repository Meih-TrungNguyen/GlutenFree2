import React, { Component } from "react";
import { SearchBar } from "react-native-elements";
import firebase from "firebase";
import ViewCart from "./ViewCart";
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

/**Class EditItem responsible to show the screen,
 * where customers can make changes in specific Item, 
 * Name, Price and, Quantity.
 */
export default class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      consumer: "1",
      quantity: "",
    };
  }

  //this function update changes made in the item.
  editItem() {

    alert("updated");
    const { name, price, consumer, quantity } = this.state;

  }

  // render is a function that tell what to display
  // on the the EditItem screen. every component will 
  // have a title to describe them.
  render() {
    return (
      <ImageBackground
        source={require("../assets/Home-screen.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.screenContainer}>
          <View style={styles.topView}>
            <Text style={styles.textElement}>Edit Item</Text>
          </View>

          {/* item name field */}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              placeholder={"Enter Item name"}
              onChangeText={(name) => this.setState({ name })}
            />
          </View>

          {/* price field */}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              placeholder={"Enter price"}
              keyboardType="numeric"
              onChangeText={(price) => this.setState({ price })}
            />
          </View>

          {/* quantity field */}
          <View style={styles.textBoxView}>
            <TextInput
              style={styles.textBox}
              placeholder={"Quantity"}
              maxLength={2}
              keyboardType="numeric"
              onChangeText={(quantity) => this.setState({ quantity })}
            />
          </View>

          <View style={styles.buttonView}>
            {/* save button*/}
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => this.editItem()}>
                <Text style={styles.textElement}>Save Item</Text>
              </TouchableOpacity>
            </View>
            {/* Go to view cart button*/}
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ViewCart")}
                title="Go ViewCart"
              >
                <Text style={styles.textElement}>Go View Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

// Styling for the screen
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
