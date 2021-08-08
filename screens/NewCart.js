import React from "react";
import { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AddItem from "./AddItem";
import HomeScreen from "./Home";
import LinkItem from "./LinkItem";
import ViewCart from "./ViewCart";

export default class NewCart extends Component {
  render() {
    return (
      <ImageBackground
        source={require("../assets/Home-screen.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.textBoxView}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
            title="Go Home"
          >
            <AntDesign name="home" size={50} color="black" />
          </TouchableOpacity>
          <Text style={styles.textElement}>Home</Text>
        </View>
        <SafeAreaView style={styles.screenContainer}>
          <SafeAreaView>
            <View style={styles.textBoxView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("AddItem")}
                title="Go Add Item"
              >
                <AntDesign name="pluscircleo" size={50} color="black" />
              </TouchableOpacity>
              <Text style={styles.textElement}>Add Items</Text>
            </View>
            <View style={styles.textBoxView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ViewCart")}
                title="Go ViewCart"
              >
                <AntDesign name="eyeo" size={50} color="black" />
              </TouchableOpacity>
              <Text style={styles.textElement}>View Cart</Text>
            </View>
            <View style={styles.textBoxView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("LinkItem")}
                title="Go LinkItem"
              >
                <AntDesign name="link" size={50} color="black" />
              </TouchableOpacity>
              <Text style={styles.textElement}>Link Items</Text>
            </View>
          </SafeAreaView>

          <SafeAreaView>
            <View style={styles.textBoxView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Report")}
                title="Go Report"
              >
                <AntDesign name="save" size={50} color="" />
              </TouchableOpacity>
              <Text style={styles.textElement}>Save Receipt</Text>
            </View>
          </SafeAreaView>

          {/* <View style={styles.buttonView}>
            <View style={styles.buttons}>
              <TouchableOpacity>
                <Text style={styles.buttonText}>Finish Shopping</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.space} />
            <View style={styles.buttons}>
              <TouchableOpacity>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: 50,
  },
  buttons: {
    backgroundColor: "grey",
    fontSize: 200,
    height: 50,
    width: 200,
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
    paddingTop: 40,
  },
  buttonView: {
    flexDirection: "row",
    paddingTop: 40,
    // marginHorizontal: 20
  },
  buttonText: {
    fontSize: 25,
    marginTop: 8,
    textAlign: "center",
    color: "black",
    // marginLeft: 20
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
});

// export default NewCart;
