import React, { Component } from "react";
import { SearchBar } from "react-native-elements";
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import {Ionicons, AntDesign, Entypo, MaterialCommunityIcons} from "@expo/vector-icons";

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
                Date: '2021/05/06',
                price: '$3'
            },
            {
                Date: '2021/05/06',
                price: '$3'
            },
            {
                Date: '2021/05/06',
                price: '$3'
            },
            {
                Date: '2021/05/06',
                price: '$3'
            },
        ]
        
        return (
          <ImageBackground
          source={require("../assets/Home-screen.jpg")}
          style={styles.backgroundImage}
        >
          
            <View style={styles.topView}>
              <Text style={styles.textElement}>History</Text>
            </View>
            <View style={{padding: 10}}>
                {
                    list.map((item, i) => (
                        <ListItem key={i} bottomDivider>
                            <ListItem.Content>
                              
                            <View style={styles.historyContainer}>
                                <ListItem.Title>
                                    <Text>Date: </Text>
                                    {item.Date}
                                </ListItem.Title>
                                <View style={styles.space}></View>
                                  <ListItem.Title>
                                      <Text style={{fontSize: 25}}>{item.price}</Text>
                                  </ListItem.Title>
                                  
                            </View>
                                <ListItem.Title>
                                  <TouchableOpacity  
                                      // onPress={() => this.editItem()}
                                      onPress={() => this.props.navigation.navigate("")}
                                  >
                                      <Text style={styles.buttonText, { color: 'red' }}>View Reciept</Text>
                                  </TouchableOpacity>
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
            
            {/* </SafeAreaView> */}
            </ImageBackground>
            

        );
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        // marginTop: 50
      },
    historyContainer: {
      justifyContent: "space-between",
      flexDirection: "row",
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
        // justifyContent: "center"

    },
    buttonText:{
        fontSize: 30,
        marginTop: 4,
        textAlign: 'center',
        // color: "blackred",
        // marginLeft: 20

    },
    space: {
        width: 150, 
        height: 10,
    },
    textElement: {
        fontSize: 25,
        // color: 'white',
        marginTop: 8,
        textAlign: "center",
        // paddingRight: 50
    },
    topView: {
      justifyContent: "center",
      flexDirection: "row",
      paddingVertical: 10,
      paddingHorizontal: 10,
      // backgroundColor: 'lightblue',
      marginBottom: 20
    },

})