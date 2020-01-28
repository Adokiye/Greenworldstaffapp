import {StyleSheet} from 'react-native';

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
  topView: {
      width: '89%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
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
    backgroundColor: '#E2574C',
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
cancelButton: {
    width: 218, 
    height: 33,
    borderRadius: 4,
    backgroundColor: '#C41B1B',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
},
closeMenuView: {
    width: '89%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
}
});
