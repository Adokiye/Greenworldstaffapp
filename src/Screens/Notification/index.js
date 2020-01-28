import React, {Component, Fragment} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Dimensions,
  TouchableOpacity,
 
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
var moment = require('moment');
import {API_URL} from '../../../root.js';
import axios from 'axios';
import styles from './styles/styles.notification';
import OrderBox from '../../components/OrderBox/index';
import Loader from '../../components/Loading/loader';
import NormalHeader from '../../components/Header/NormalHeader/index';
import CompletedBottomMenu from '../../components/BottomMenu/CompletedBottomMenu'
import NotificationBox from '../../components/NotificationBox/index';
class Notification extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed',
  };
  constructor(props) {
    super(props);
    this.state = {
      regLoader: false,
      token: '',
      notifications: [],
      fetch: false,
      completed_menu: false,
      selected_address: '',
      selected_description: '',
      selected_locker_id: '',
      selected_locker_code: '',
      selected_name: '',
      selected_driver_name: '',
      selected_order_id: '',
      selected_date: ''
    };
    this.getNotifications = this.getNotifications.bind(this);
  }

  // 08029694883
  async componentDidMount() {
    const store = await AsyncStorage.getItem('user_stats');
    const {token} = JSON.parse(store);
    console.log(token);
    this.setState(
      {
        token,
      },
      () => this.getNotifications(),
    );
  }
  getNotifications() {
    console.log(this.state.token);
    this.setState({regLoader: true})
    var config = {
      headers: {Authorization: 'Bearer ' + this.state.token},
      timeout: 20000,
    };
    axios
      .get(API_URL + 'notifications', config)
      .then(response => {
        console.log(response);
        if (response.data && response.data.length > 0) {
          console.log('response.data');
          console.log('here' + response.data);
          var len = response.data.length;
          this.setState({notifications: [],});
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
              this.setState(prevState => ({
                notifications: [...prevState.notifications, row],
              }));
          }
        }
        this.setState({regLoader: false, fetch: false});
      })
      .catch(error => {
        this.setState({regLoader: false});
        if (error.code == 'ECONNABORTED') {
          Toast.show('Connection TImeout');
        } else {
          Toast.show(error.message);
        }
        console.log(error);
      });
  }
  render() {
    let notifications = (
        <FlatList
        data={this.state.notifications}
        extraData={this.state}
        renderItem={({item, index}) => (
          <NotificationBox
            text={item.description}
            date={
              moment(item.createdAt).format('dddd, MMMM Do YYYY') != moment().format('dddd, MMMM Do YYYY')
            ?  moment(item.createdAt).format('MMMM Do YYYY') : moment(item.createdAt).format('hh:MM:ss')}
          />
        )}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
    );
    return (
      <View style={styles.container}>
        <NormalHeader 
            text={'Notifications'}
            navigation={this.props.navigation}
        />
        {this.state.regLoader ? 
          <View style={styles.loaderBody}>
            <ActivityIndicator size={'large'} color={'#1bc47d'} />
            <Text style={{fontFamily: 'Gilroy-Medium', marginTop: 20}}>
              Loading Notifications
            </Text>
          </View>
        : <Fragment>
        {notifications}
        {this.state.regLoader && <Loader />}
        {this.state.completed_menu  &&   <View style={styles.overlay} /> }
        {this.state.completed_menu  &&        <CompletedBottomMenu 
            hide={this.hide.bind(this)}
            orderId={this.state.selected_order_id}
            name={this.state.selected_name}
            driver_name={this.state.driver_name}
            locker_id={this.state.selected_locker_id}
            locker_code={this.state.selected_locker_code}
        />}</Fragment>   }
        
      </View>
    );
  }
}
export default Notification;
