import {StyleSheet, Dimensions, Platform} from 'react-native';

const screen = Dimensions.get('screen');

const TabBarStyle  =
  StyleSheet.create({
    container: {
      width: screen.width,
      height: 75,
      alignItems: 'center',
      justifyContent: 'space-around',
  //    paddingHorizontal: screen.height* ( 4/100),
      backgroundColor: 'white',
      elevation: 2,
      flexDirection: 'row',
    },
    iconView: {
      flexDirection: 'column',
      alignItems: 'center',
      height: 50,
      justifyContent: 'space-between',
    },
    onlineText: {
      color: '#1bc47d',
      fontFamily: 'Gilroy-Semibold',
      fontSize: 11,
    },
    offlineText: {
      color: '#898888',
      fontFamily: 'Gilroy-Semibold',
      fontSize: 11,
    },
  });

export default TabBarStyle;
