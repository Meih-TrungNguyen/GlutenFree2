import React from 'react';
import screens from '../screens/Login';
import { render, screen } from '@testing-library/react'


test('render login screen with init state', () => {
    const Login = Login(
    <LoginScreen
    handleSubmit={handleSubmit}
    valid={false}
    submitting={false}
    />
    )
    expect(toJson(loginWrap)).toMatchSnapshot()
    });