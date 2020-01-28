import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../Screens/Login/index';
import {fromRight} from 'react-navigation-transitions';

const AuthenticationStack = createStackNavigator(
  {
    Login: Login,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
    transitionConfig: () => fromRight(),
  },
);

export default AuthenticationStack;
