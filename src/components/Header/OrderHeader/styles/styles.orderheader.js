import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    headerView: {
        width: '100%',
        height: 145,
        backgroundColor: '#1bc47d',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
     //   marginBottom: 30
    },
    orderRow: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderTextInputView: {
        width: '85%',
        height: 28,
        alignSelf: 'center',
        backgroundColor: '#82F0C2',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 0,
        backgroundColor: '#82F0C2',
        color: '#424242',
    },
    hiText: {
        color: '#fff',
        fontFamily: 'Gilroy-Bold',
        fontSize: 26
    },
    tabview: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tabOnlineText: {
        fontSize: 16,
        color: '#074C2C',
        fontFamily: 'Gilroy-Regular'
    },
    tabOfflineText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Gilroy-Regular'
    }
});
