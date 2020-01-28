import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 295,
    flexDirection: 'column',
  //  alignItems: 'center',
    justifyContent: 'space-between',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 25,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white'
  },
  topView: {
      width: '89%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center'
  },
  textColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  orderIdText: {
    color: '#000',
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
  },
  dateText: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 10,
    color: 'black',
  },
  orderTypeText: {
    color: 'white',
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
  },
  pendingOrderView: {
    width: 105,
    height: 30,
    backgroundColor: '#5ABA34',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  customerView: {
      width: '89%',
      height: 36,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignSelf: 'center'
  },
  addressHeader: {
      color: 'black',
      fontSize: 11,
      fontFamily: 'Gilroy-Regular'
  },
  addressText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Gilroy-Regular'
},
 bottomButton: {
     width: '100%',
     height: 60,
     backgroundColor: '#1bc47d',
     alignItems: 'center',
     justifyContent: 'center',
     flexDirection: 'row',
 },
 swipeView: {
     width: 276,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
 },
 swipeText: {
     color: 'white',
     fontFamily: 'Gilroy-Regular',
     fontSize: 18
 },
 closeMenuView: {
    marginLeft: '6%',
    width: 16, 
    height: 16
}
});
