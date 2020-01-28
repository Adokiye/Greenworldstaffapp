/* /src/components/TabBar.js */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import TabBarStyle from './styles/styles.tabbar';

const styles = TabBarStyle;

const TabBar = props => {
  const {
    getLabelText,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;

  const {routes, index: activeRouteIndex} = navigation.state;

  return (
    <View style={styles.container}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;

        return (
          <TouchableOpacity
            key={routeIndex}
            onPress={() => {
              onTabPress({route});
            }}
            onLongPress={() => {
              onTabLongPress({route});
            }}
            accessibilityLabel={getAccessibilityLabel({route})}>
            <View style={styles.iconView}>
            {getLabelText({route}) === 'Home' ?
            ( isRouteActive ? (
                   <Image 
                     source={require('../assets/icons/home.png')}
                     style={{width: 28, height: 28}}
                     resizeMode={'contain'}
                   />
                ) : (
                  <Image 
                     source={require('../assets/icons/homeNormal.png')}
                     style={{width: 28, height: 28}}
                     resizeMode={'contain'}
                   />
                )) : null}
                {getLabelText({route}) === 'Pickup' ?
            ( isRouteActive ? (
                   <Image 
                     source={require('../assets/icons/pickup.png')}
                     style={{width: 28, height: 28}}
                     resizeMode={'contain'}
                   />
                ) : (
                  <Image 
                     source={require('../assets/icons/pickupNormal.png')}
                     style={{width: 28, height: 28}}
                     resizeMode={'contain'}
                   />
                )) : null}
                {getLabelText({route}) === 'Deliveries' ?
            ( isRouteActive ? (
                   <Image 
                     source={require('../assets/icons/deliveries.png')}
                     style={{width: 28, height: 28}}
                     resizeMode={'contain'}
                   />
                ) : (
                  <Image 
                     source={require('../assets/icons/deliveriesNormal.png')}
                     style={{width: 28, height: 28}}
                     resizeMode={'contain'}
                   />
                )) : null}
                {getLabelText({route}) === 'Progress' ?
            ( isRouteActive ? (
                   <Image 
                     source={require('../assets/icons/progress.png')}
                     style={{width: 28, height: 28}}
                     resizeMode={'contain'}
                   />
                ) : (
                  <Image 
                     source={require('../assets/icons/progressNormal.png')}
                     style={{width: 28, height: 28}}
                     resizeMode={'contain'}
                   />
                )) : null}
              <Text
                style={isRouteActive ? styles.onlineText : styles.offlineText}>
                {getLabelText({route})}
              </Text>
              </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
