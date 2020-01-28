import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
   container: {
       width: '93%',
       borderRadius: 6,
       elevation: 3,
       backgroundColor: 'white',
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       paddingHorizontal: '3.46%',
       height: 70,
       alignSelf: 'center',
       marginVertical: 15,
   },
   notificationText: {
       fontSize: 12,
       color: 'black',
       fontFamily: 'Gilroy-Regular',
       flex: 1,
       flexWrap: 'wrap'
   },
   timeText: {
       fontSize: 7,
       color: '#AFACAC',
       fontFamily: 'Gilroy-Regular',
   }
});
