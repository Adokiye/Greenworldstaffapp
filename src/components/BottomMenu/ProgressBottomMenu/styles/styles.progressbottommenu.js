import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 325,
    flexDirection: 'column',
  //  alignItems: 'center',
    justifyContent: 'space-around',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white'
  },
  orderIdText: {
    color: '#000',
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
  },
  topView: {
      width: '89%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center'
  },
  markerView: {
      width: '89%',
      flexDirection: 'row',
      alignItems:'center',
      alignSelf: 'center',
      justifyContent: 'center'
  },
  circleOnline: {
      width: screen.width * (10.4/100),
      height: screen.width * (10.4/100),
      borderRadius: (screen.width * (10.4/100)) / 2,
      backgroundColor: '#1bc47d',
      alignItems: 'center',
      justifyContent: 'center',
  },
  circleOffline: {
    width: screen.width * (10.4/100),
    height: screen.width * (10.4/100),
    borderRadius: (screen.width * (10.4/100)) / 2,
    backgroundColor: '#BDEED9',
    alignItems: 'center',
    justifyContent: 'center',
},
  squareOnline: {
    width: screen.width * (11/100),
    height: 6,
    backgroundColor: '#1bc47d',
  },
  squareOffline: {
    width: screen.width * (10.67/100),
    height: 6,
    backgroundColor: '#BDEED9',
  },
  textView: {
    width: '93%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  text: {
      fontSize: 10,
      fontFamily: 'Gilroy-Regular',
      color: 'black'
  },
  orderTypeText: {
    color: 'white',
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
  },
  pendingOrderView: {
    width: 105,
    height: 30,
    backgroundColor: '#FFBC00',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  customerView: {
      width: '89%',
      height: 36,
      flexDirection: 'column',
      justifyContent: 'space-between'
  },
cancelButton: {
    width: 218, 
    height: 33,
    borderRadius: 4,
    backgroundColor: '#1bc47d',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
},
closeMenuView: {
    marginLeft: '6%',
    width: 16, 
    height: 16
}
});
