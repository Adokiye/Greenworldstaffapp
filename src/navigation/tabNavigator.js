import React from 'react';
import TabBar from './TabBar';
import Home from '../Screens/Dashboard/Home';
import Pickup from '../Screens/Dashboard/Pickup';
import Progress from '../Screens/Dashboard/Progress';
import Deliveries from '../Screens/Dashboard/Deliveries';
import {createBottomTabNavigator} from 'react-navigation-tabs';

const TabRouter = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
    },
    Pickup: {
      screen: Pickup,
    },
    Deliveries: {
      screen: Deliveries,
    },
    Progress: {
      screen: Progress,
    },
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: TabBar,
    //    tabBarPosition: 'bottom',
    tabBarOptions: {
      // activeTintColor: '#FA4A84',
      // inactiveTintColor: '#5D6262',
      // style: {height: 60},
    },
    navigationOptions: {
    },
  },
);
export default TabRouter;
