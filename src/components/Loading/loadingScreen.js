import React, {Component, Fragment} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles/styles.loadingscreen';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    StatusBar,
    View,
    TouchableOpacity,
    SafeAreaView
  } from "react-native";
  import firebase from "react-native-firebase";

class LoadingScreen extends Component {
  componentDidMount() {
    // AsyncStorage.clear();
    // this.props.navigation.navigate('Dashboard');
    //check if user_stats exists in local storage
    AsyncStorage.getItem('user_stats').then(data => {
      //if stats exists, check if user is logged in
      if (data) {
        let stats = JSON.parse(data);

        // for a new user
        if (stats.token || stats.device_token || stats.first_name) {
          firebase.messaging().subscribeToTopic('admin');
          this.props.navigation.navigate('Dashboard');
        }
      } else {
        firebase.messaging().unsubscribeToTopic('admin');
       // this.props.navigation.navigate('Login');
       this.props.navigation.navigate('Login');
      }
    });
  }

  render() {
    return  <SafeAreaView style={styles.container}>
    <View style={styles.welcomeBox}>
        <Image 
            source={require('../../assets/images/logo.png')}
            style={{width: 200, height: 200}}
            resizeMode={'contain'}
        />
    </View>
     </SafeAreaView>
  }
}

export default LoadingScreen;
