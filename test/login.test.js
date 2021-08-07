import React from 'react';
import screens from '../screens/Login';
import { render, screen } from '@testing-library/react'
import {render}from '@testing-library/react-native';
const Login = Login(
    <LoginScreen
    
    valid={false}
    submitting={false}
    />
    ,
    expect(toJson(loginWrap)).toMatchSnapshot()
    })