import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Image
} from 'react-native';

import styles from './styles/styles.normalheader';

class NormalHeader extends Component {
    render(){
        const {text} = this.props;
          return (
    <View style={styles.headerView}>
    <Image
    source={require('../../../assets/images/topAbstract.png')} 
        resizeMode={'contain'}
        style={{position: 'absolute', width: 187, height: 50, top: 0, right: 0}}
    />
    { text == 'Notifications' &&         <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
        <Image 
                source={require('../../../assets/icons/back.png')}
                resizeMode={'contain'}
                style={{width: 25, height: 25, }}
            /></TouchableOpacity>}
        <View style={styles.welcomeBox}>
            <Text style={styles.hiText}>
               {text}
            </Text>
        </View>
        <Image 
            source={require('../../../assets/icons/notification.png')}
            resizeMode={'contain'}
            style={{width: 25, height: 25, opacity: 0}}
        />
    </View>
  );
    }

};

export default NormalHeader;
