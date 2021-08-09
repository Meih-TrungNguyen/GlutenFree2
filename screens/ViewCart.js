import React, {useState} from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import {Ionicons, AntDesign, Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
/**Class Edit Item responsible to update item
 * from the Cart
 */
export default class ViewCart extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          name: " ",
          price:" ",
          quantity:"",
          icon:"",
          
        };
    }

    editItem(){

    }
    
    
    render() {
        const list = [
            {
                name: 'banana',
                price: '3',
                quantity: '1',
                icon: 'av-timer'
            },
            {
                name: 'apple',
                price: '3',
                quantity: '1',
                icon: 'av-timer'
            },
            {
                name: 'cucumber',
                price: '3',
                quantity: '1',
                icon: 'av-timer'
            },
            {
                name: 'lettuce',
                price: '3',
                quantity: '1',
                icon: 'av-timer'
            },
        ]
        
        return (
            <ImageBackground source={require('../assets/Home-screen.jpg')} style={styles.backgroundImage} >
            <SafeAreaView>
            <View>
                {
                    list.map((item, i) => (
                        <ListItem key={i} bottomDivider>
                            <Icon name={item.icon} />
                            <ListItem.Content>
                                <ListItem.Title>
                                    <Text>name: </Text>
                                    {item.name}
                                </ListItem.Title>
                                <ListItem.Title>
                                    <Text>quantity: </Text>
                                    {item.quantity}
                                </ListItem.Title>
                                <ListItem.Title>
                                    <Text>price: </Text>
                                    {item.price}
                                </ListItem.Title>
                                <ListItem.Title>
                                <TouchableOpacity  
                                    onPress={() => this.editItem()}
                                    onPress={() => this.props.navigation.navigate("EditItem")}

                                >
                                        <Text style={styles.buttonText, { color: 'red' }}>Edit</Text>
                                    </TouchableOpacity>
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
            <View style={styles.buttonView}>
                                {/* save button*/}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={() => this.editItem()}>
                            <Text style={styles.textElement}>Save Cart</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            </SafeAreaView>
            </ImageBackground>
            

        );
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        marginTop: 50
      },
    screenContainer: {
      flex: 1,
      paddingTop: 50,
      paddingLeft: 20
    },
    buttons: {
        backgroundColor: "lightgrey",
        color: "white",
        fontSize: 200,
        height: 50,
        width: 190,
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginVertical: 10,
        paddingVertical: 8,
    },
    backgroundImage:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"

    },
    buttonText:{
        fontSize: 30,
        marginTop: 4,
        textAlign: 'center',
        // color: "blackred",
        // marginLeft: 20

    },
    space: {
        width: 20, 
        height: 10,
    },
    textElement: {
        fontSize: 25,
        marginTop: 8,
        textAlign: "center",
    },

})