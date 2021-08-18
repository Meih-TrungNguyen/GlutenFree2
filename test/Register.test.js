import React from 'react';
import screens from '../screens/Register';
import { render, screen } from '@testing-library/react'
import {render}from 'react-test-renderer';

test('register upload action' , () => {
    store.dispatch(UploadActions.registerUpload({upload: 'uploadKey'}))
    expect(store.getActions()).toMatchSnapshot()
  });
  test('Renders snapshot as expected', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
});
  
