import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
  loadingText: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 15,
    color: 'black',
  },
  loadingView: {
    width: 120,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
  },
  absoluteView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
  },
});
