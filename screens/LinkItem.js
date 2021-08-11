import React, { useState  } from 'react';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { Component } from 'react';
import { Ionicons, AntDesign, Fontisto, Octicons } from "@expo/vector-icons"
import { ListItem, Icon, Image } from 'react-native-elements';
import firebase from "firebase";
import img1 from './images/image1.jpg';
import img2 from './images/image2.jpg';
import img3 from './images/image3.jpg';
import img4 from './images/image4.jpg';
import img5 from './images/image5.jpg';
import img6 from './images/image6.jpg';

export default class LinkItem extends Component {
  constructor(props) {
    super(props);
    this.toggleSortLinked = this.toggleSortLinked.bind(this)
    this.state = {
      products: [
        {
          id: '',
          name: '',
          price: '',
          image: '',
          glutenFree: '',
        }
      ],
      quantity: 0
    };
  }

  counter = 0;
  total = 0;

  sortByGlutenFree(){
    const {products} = this.state
    let newList = products
    if(this.state.glutenFree){
      newList = products.sort((a,b) => a.id > b.id  ) 
    }else{
      newList = products.sort((a,b) => a.id < b.id ) 
    }
    this.setState({
      glutenFree: !this.state.glutenFree,
      products: newList
    })
  }

  toggleSortLinked(event){
    this.sortByGlutenFree()
  }

  onAdd = (product) => {
    console.log(product);
    this.setState({ quantity: this.state.quantity + 1 })
  }

  addItemToCart() {
    alert("Added");
    this.counter += 1;
    const { id, name, price, quantity, glutenFree } = this.state;
    const cart = {
      id,
      name,
      price,
      quantity,
      glutenFree
    };

  }


  doAdd = () => {
    this.onAdd({ id: product.id })

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
    const list = [
      { 
        id: '0',
        name: 'Made Good Granola Bars',
        price: '4.99',
        image: './images/image1.jpg',
        glutenFree: 'Yes'
      },
      {
        id: '1',
        name: 'Bread',
        price: '6.99',
        image: img2,
        glutenFree: 'Yes'
      },
      {
        id: '2',
        name: 'Bens Original Ready Rice',
        price: '7.99',
        image: img3,
        glutenFree: 'Yes'
      },
      {
        id: '3',
        name: 'DIGIORNO RISING CRUST',
        price: '10.99',
        image: img4,
        glutenFree: 'No'
      },
      {
        id: '4',
        name: 'Budweiser (dozen)',
        price: '23.88',
        image: img5,
        glutenFree: 'No'
      },
      {
        id: '5',
        name: 'Quaker Instant Oatmeal',
        price: '5.99',
        image: img6,
        glutenFree: 'No'
      },
  ]
    return (

      <ImageBackground source={require('../assets/Home-screen.jpg')} style={styles.backgroundImage}>

        <View style={styles.screenContainer}>
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
            </TouchableOpacity>
            <View style={styles.button}>
              <button onClick={this.toggleSortLinked}>Sort</button>
            </View>
          </View>
        </View>

       <View>
       {
                    list.map((item, i) => (
                        <ListItem key={i} bottomDivider>
                            <Image name={item.image} />
                            <ListItem.Content>
                                <ListItem.Title>
                                    <Text>name: </Text>
                                    {item.name}
                                </ListItem.Title>
                                <ListItem.Title>
                                    <Text>glutenFree:  </Text>
                                    {item.glutenFree}
                                </ListItem.Title>
                                <ListItem.Title>
                                    <Text>price: $ </Text>
                                    {item.price}
                                </ListItem.Title>
                                <ListItem.Title>
                                <TouchableOpacity onPress={() => this.addItemToCart()}>
                                    <Text style={styles.textElement} size={5}>Add to Cart</Text>
                                  </TouchableOpacity>
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
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
  screenContainer: {
    flex: 1,
  },
  text: {
    fontSize: 50,
    textAlign: 'center',
  },
  textBoxView: {
    flex: 1,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 80,
    width: 50
  },
  TouchButton: {
    flexDirection: 'row',
  },
  image: {
    width: 250,
    height: 250,
  },
  itemText: {
    fontSize: 25,
    textAlign: 'center',
  }
});

