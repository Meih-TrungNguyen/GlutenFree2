import React from "react";
import { Component } from "react";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import {
  Ionicons,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default class History extends Component {
  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity>
          <Ionicons name="construct" size={100} color="black" />
          <Text>????????????</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="construct" size={100} color="black" />
          <Text>UNDER CONSTRUCTION</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
