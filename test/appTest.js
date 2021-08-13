import React from 'react';
import screens from '../App';
import {render}from '@testing-library/react-native';
import { it } from '@jest/globals';

Test('start upload action will combine upload\'s watting queue and failed queue then update upload\'s uploading state', () => {
    let currentState = Map({
        'uploadTestKey': new Upload({
            name: 'uploadTestKey',
            wattingQueue: List([
                new UploadItem({
                    name: 'Login',
                    filepath: '../screens/Login'
                })
            ]),
            uploadedQueue: List([
                new UploadItem({
                    name: 'Registere',
                    filepath: '../screens/Register'
                }),
            ]),
            failedQueue: List([
                new UploadItem({
                    name: 'AddItem',
                    filepath: '../screens/AddItem'
            ]),
        })
    })
    currentState = UploadReducer(currentState, UPloadActions.startUpload({upload: 'uploadTestKey'}))
    expect(currentState.is(
        Map({
        'uploadTestKey': new Upload({
            name: 'uploadTestKey',
            wattingQueue: List([
                new UploadItem({
                    name: 'Login',
                    filepath: '../screens/Login'
                }),
                new UploadItem({
                    name: 'AddItem',
                    filepath: '../screens/AddItem'
                }),
            ]),
            uploadedQueue: List([
                new UploadItem({
                    name: 'Registere',
                    filepath: '../screens/Register'
                }),
            ]),
            failedQueue: List([]),
        })
    })
    )).toBe(true)
})


describe("upload component reducer test", () => {
    it('register upload action will register a upload queue to state', () => {
    let currentState = Map({})
    currentState = UploadReducer(currentState, UPloadActions.registerUpload({upload: 'uploadTestKey'}))
    expect(currentState).toMatchSnapshot()
    })
    
    it('destroy upload action will remove upload queue from state', () => {
    let currentState = Map({
    'uploadTestKey': new Upload({
    name: 'uploadTestKey'
    })
    })
    currentState = UploadReducer(currentState, UPloadActions.destroyUpload({upload: 'uploadTestKey'}))
    expect(currentState).toMatchSnapshot()
    });