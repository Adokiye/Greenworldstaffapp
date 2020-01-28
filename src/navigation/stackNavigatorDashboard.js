import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import TabRouter from './tabNavigator';
import {fromRight} from 'react-navigation-transitions';
import Notification from '../Screens/Notification';

const DashboardStack = createStackNavigator(
  {
    Dashboard: TabRouter,
    Notifications: Notification,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Dashboard',
    transitionConfig: () => fromRight(),
  },
);

export default DashboardStack;
