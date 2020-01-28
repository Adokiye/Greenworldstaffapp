/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import styles from './styles/styles.loader';
export default class Loader extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed',
  };
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      isVisible: true,
    };
  }
  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.absoluteView} />
        <View style={styles.loadingView}>
          <ActivityIndicator color="#1bc47d" size="large" />
          <Text style={styles.loadingText}>Loading</Text>
        </View>
      </View>
    );
  }
}
