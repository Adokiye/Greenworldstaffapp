import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: 'white'
   },
   overlay: {
    backgroundColor: 'rgba(27, 0, 59, 0.4)',
    width: screen.width,
    height: screen.height,
    position: 'absolute',
    top: 0,
  },
  loaderBody: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: '60%',
    justifyContent: 'center'
  }
});
