import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Component } from "react";
import { Ionicons, AntDesign, Fontisto, Octicons } from "@expo/vector-icons";
import img1 from "./images/image1.jpg";
import img2 from "./images/image2.jpg";
import img3 from "./images/image3.jpg";
import LinkItem from "./LinkItem";

export default class Data extends Component {
  state = {
    products: "",
    quantity: 0,
  };

  render() {
    console.log(this.props);

    return (
      <div>
        <View style={styles.textElement}>
          <div className="product1">
            <h3>Made Good Granola Bars</h3>
            <h4>$ 4.99</h4>
            <img src={img1} />
            {this.props.children}
          </div>
        </View>
        <View style={styles.textElement}>
          <div className="product2">
            <h3>Bread</h3>
            <h4>$ 6.99</h4>
            <img src={img2} />
            {this.props.children}
          </div>
        </View>
        <View style={styles.textElement}>
          <div className="product3">
            <h3>Bens Original Ready Rice</h3>
            <h4>$ 7.99</h4>
            <img src={img3} alt="" />
            {this.props.children}
          </div>
        </View>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  textElement: {
    flex: 1,
  },
});
