import React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import {Ionicons, AntDesign, Entypo, MaterialCommunityIcons} from "@expo/vector-icons"

export default function ViewCart(props){
    
        return(
            <div>
            <ImageBackground source={require('../assets/Home-screen.jpg')} style={styles.backgroundImage} >
            <SafeAreaView>
                <TouchableOpacity>
                    <Ionicons name="construct" size={100} color="black" />
                    <Text>????????????</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="construct" size={100} color="black" />
                    <Text>UNDER CONSTRUCTION</Text>
                </TouchableOpacity>

                <View style={styles.buttonView}>
                    <View style={styles.buttons}>
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>Finish Shopping</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.space}/>
                    <View style={styles.buttons}>
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>Save/View Receipt</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
            </ImageBackground>
            </div>
        )
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
    buttons:{
        backgroundColor: 'grey',
        fontSize: 200, 
        height: 80,
        width: 200
    },
    buttonView:{
        flexDirection: 'row',
        paddingTop: 40,
    },
    backgroundImage:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"

    },
    buttonText:{
        fontSize: 25,
        marginTop: 8,
        textAlign: 'center',
        color: "black",
        // marginLeft: 20

    },
    space: {
        width: 20, 
        height: 10,
      },

})