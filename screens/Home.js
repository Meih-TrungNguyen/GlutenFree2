import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import { format } from "date-fns";
export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }
  onLogout = () => {
    firebase.auth().signOut();
  };

  cartNumber = 0;

  addCart() {
    const { total } = this.state;
    const ref = firebase
      .database()
      .ref("User/" + firebase.auth().currentUser.uid);
    ref.once("value", (snap) => {
      this.cartNumber = snap.val().cart + 1;
      firebase
        .database()
        .ref("User/" + firebase.auth().currentUser.uid)
        .update({
          cart: this.cartNumber,
        })
        .then(() => {
          const cart = {
            createDate: JSON.parse(
              JSON.stringify(format(new Date(), "MM/dd/yyyy"))
            ),
            total,
          };
          firebase
            .database()
            .ref("User/" + firebase.auth().currentUser.uid + "/Carts")
            .child("Cart " + this.cartNumber)
            .set(cart)
            .then(() => {
              this.props.navigation.navigate("NewCart", {
                cartCount: this.cartNumber,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });
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
              onPress={() => this.addCart()}
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
