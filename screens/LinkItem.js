import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { Component } from 'react';
import { Ionicons, AntDesign, Fontisto, Octicons } from "@expo/vector-icons"
import img1 from './images/image1.jpg';
import img2 from './images/image2.jpg';
import img3 from './images/image3.jpg';

export default class LinkItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: '',
          name: '',
          price: '',
          image: ''
        }
      ],
      quantity: 0
    };
  }
  onAdd = (product) => {
    console.log(product);
    this.setState({ quantity: this.state.quantity + 1 })
  };

  doAdd = () => {
    this.onAdd({ id: product.id })
  };

  onDelete = (productId) => {
    console.log(productId)
    if (this.state.quantity >= 1) {
      this.setState({ quantity: this.state.quantity - 1 })
    } else {
      this.setState({ quantity: 0 })
    }
  };

  doDelete = () => {
    this.onDelete({ id: product.id })
  };

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.quantity === 0 ? "warning" : "primary";
    return classes;
  };

  formatQuantity() {
    const { quantity } = this.state;
    return quantity === 0 ? '(0)' : quantity;
  };

  render() {
    return (

      <ImageBackground source={require('../assets/Home-screen.jpg')} style={styles.backgroundImage}>

        <View style={styles.topView}>
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("NewCart")} title="Go NewCart">
              <AntDesign name="close" size={50} color="darkgreen" />
            </TouchableOpacity>
          </View>

          <Text style={styles.text}>Link Items</Text>

          <View style={styles.topViewRight}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("ViewCart")} title="Go to ViewCart">
              <AntDesign name="shoppingcart" size={50} color="darkgreen" />
              <span className={this.getBadgeClasses()}>{this.formatQuantity()}</span>
            </TouchableOpacity>
            <View style={styles.button}>
              <button className="sort">Sort</button>
            </View>
          </View>
        </View>

        <View style={styles.textElement}>
          <Text style={styles.itemText}>Made Good Granola Bars</Text>
          <Text style={styles.itemText}>$ 4.99</Text>
          <View style={styles.image}>
            <img src={img1} />
          </View>
          <View style={styles.TouchButton}>
            <TouchableOpacity title="button">
              <AntDesign onClick={() => this.onAdd({ id: 1 })} name="plus" size={35} color="black" />
            </TouchableOpacity>
            <TouchableOpacity title="button">
              <AntDesign onClick={() => this.onDelete({ id: 1 })} name="minus" size={35} color="black" />
            </TouchableOpacity>
            <br />
            <br />
            <br />
          </View>

          <Text style={styles.itemText}>Bread</Text>
          <Text style={styles.itemText}>$ 6.99</Text>
          <View style={styles.image}>
            <img src={img2} />
          </View>
          <View style={styles.TouchButton}>
            <TouchableOpacity title="button">
              <AntDesign onClick={() => this.onAdd({ id: 1 })} name="plus" size={35} color="black" />
            </TouchableOpacity>
            <TouchableOpacity title="button">
              <AntDesign onClick={() => this.onDelete({ id: 1 })} name="minus" size={35} color="black" />
            </TouchableOpacity>
            <br />
            <br />
            <br />
          </View>

          <Text style={styles.itemText}>Bens Original Ready Rice</Text>
          <Text style={styles.itemText}>$ 7.99</Text>
          <View style={styles.image}>
            <img src={img3} />
          </View>
          <View style={styles.TouchButton}>
            <TouchableOpacity title="button">
              <AntDesign onClick={() => this.onAdd({ id: 1 })} name="plus" size={35} color="black" />
            </TouchableOpacity>
            <TouchableOpacity title="button">
              <AntDesign onClick={() => this.onDelete({ id: 1 })} name="minus" size={35} color="black" />
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>


    );
  }

}


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"

  },
  text: {
    fontSize: 50,
    textAlign: 'center',
  },
  textBoxView: {
    flex: 3,
    marginTop: 10,
    alignItems: "flex-end"
  },
  topView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  topViewRight: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  textElement: {
    fontSize: 20,
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    height: 80,
    width: 50
  },
  TouchButton: {
    flexDirection: 'row',
    left: 750
  },
  image: {
    width: 250,
    height: 250,
    left: 670,
  },
  itemText: {
    fontSize: 25,
    textAlign: 'center',
  }
});

