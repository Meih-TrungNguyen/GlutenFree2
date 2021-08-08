import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, AntDesign, Fontisto, Octicons } from "@expo/vector-icons";
import NewCart from "./NewCart";
import firebase from "firebase";
import { format } from "date-fns";
import { Component } from "react";

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartNumber: 1,
    };
  }

  onLogout = () => {
    firebase.auth().signOut();
  };

  newCart() {
    alert("New Cart Created");
    const { cartNumber } = this.state;
    const cart = {
      createDate: JSON.parse(JSON.stringify(format(new Date(), "MM/dd/yyyy"))),
      cartNumber,
    };

    firebase
      .database()
      .ref("User/" + firebase.auth().currentUser.uid + "/Carts")
      .child("Cart " + cartNumber)
      .set(cart)
      .then(() => {
        this.props.navigation.navigate("NewCart", { cartCount: cartNumber });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateCart() {
    const { cartNumber } = this.state;
    this.setState({ cartNumber: cartNumber + 1 });
    console.log(cartNumber);
    this.newCart();
  }
  render() {
    return (
      <ImageBackground
        source={require("../assets/Home-screen.jpg")}
        style={styles.backgroundImage}
      >
        <Text style={styles.topText}>Grocery Shopping</Text>
        <View style={styles.screenContainer}>
          <View style={styles.textBoxView}>
            <TouchableOpacity
              onPress={() => this.updateCart()}
              title="Go to new cart"
            >
              <AntDesign name="shoppingcart" size={70} color="black" />
            </TouchableOpacity>
            <Text style={styles.textElement}>New Cart</Text>
          </View>

          <View style={styles.textBoxView}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("History")}
              title="Go to new cart"
            >
              <AntDesign name="book" size={70} color="black" />
            </TouchableOpacity>
            <Text style={styles.textElement}>History</Text>
          </View>

          <View style={styles.textBoxView}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("NewCart")}
              title="Go to new cart"
            >
              <AntDesign name="form" size={70} color="black" />
            </TouchableOpacity>
            <Text style={styles.textElement}>Report</Text>
          </View>
          <View style={styles.textBoxView}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Setting")}
              title="Go to new cart"
            >
              <AntDesign name="tool" size={70} color="black" />
            </TouchableOpacity>
            <Text style={styles.textElement}>Settings</Text>
          </View>
          <View style={styles.textBoxView}>
            <TouchableOpacity
              onPress={() => this.onLogout()}
              title="Go to new cart"
            >
              <AntDesign name="logout" size={70} color="black" />
            </TouchableOpacity>
            <Text style={styles.textElement}>Logout</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
  },
  buttons: {
    backgroundColor: "dodgerblue",
    color: "white",
    height: 35,
    width: 150,
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
  textBoxView: {
    flexDirection: "row",
    paddingTop: 30,
  },
  textBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    color: "black",
    marginLeft: 20,
  },
  topText: {
    fontSize: 35,
    marginTop: 20,
    textAlign: "center",
    color: "black",
  },
});
export default HomeScreen;
