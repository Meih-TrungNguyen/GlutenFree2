import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { View, Button, TextInput, StyleSheet, TouchableOpacity, Text  } from 'react-native'

import firebase from 'firebase'
import "firebase/firestore";

export class Setting extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname:'',
            city:'',
            province:'',
            language:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSettingChange = this.onSettingChange.bind(this)
    }

    handleChange(event){
        this.setState({province: event.target.province});
        this.setState({city: event.target.city});
    }

    onSettingChange() {
        const { email, password, firstname, lastname, city, province } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        firstname,
                        lastname,
                        city,
                        province,
                        email,
                        
                    })
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render(){
        return(
            <View style={styles.screenContainer}>
                
            </View>

        )
    }
}