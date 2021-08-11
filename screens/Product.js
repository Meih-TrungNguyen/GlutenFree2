import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { Component } from 'react';
import img1 from './images/image1.jpg';

export default class LinkItem extends Component{
    static products = [];

    products = [
        {   
            id : 0,
            name: 'Made Good Granola Bars',
            price: '4.99',
            img: './images/image1.jpg'
        }
       
    ];

    constructor(id, name, price, img){
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
    }
}
