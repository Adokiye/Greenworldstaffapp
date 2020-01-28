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
import {API_URL} from '../../../../root.js';
import axios from 'axios';
import styles from './styles/styles.deliveries';
import OrderBox from '../../../components/OrderBox/index';
import Loader from '../../../components/Loading/loader';
import NormalHeader from '../../../components/Header/NormalHeader/index';
import CompletedBottomMenu from '../../../components/BottomMenu/CompletedBottomMenu'
class Deliveries extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed',
  };
  constructor(props) {
    super(props);
    this.state = {
      regLoader: false,
      token: '',
      completed: [],
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
    this.getOrders = this.getOrders.bind(this);
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
      () => this.getOrders(),
    );
  }
  delivery(id){
    if(id){
      console.log('id' + id);
    this.setState({cancel_loader: true});
    var config = {
      headers: {Authorization: 'Bearer ' + this.state.token},
      timeout: 20000,
    };
    var bodyParameters = {
      order_id: id,
      delivery: true,
    };
    axios
      .post(API_URL + 'orders/adminCharge', bodyParameters, config)
      .then(response => {
        console.log(response);
        Toast.show('Delivery Succesfully Confirmed!');
        this.getOrders();
        this.setState({cancel_loader: false, fetch: false});
      })
      .catch(error => {
        this.setState({cancel_loader: false});
        if (error.code == 'ECONNABORTED') {
          Toast.show('Connection TImeout');
        } else {
          Toast.show(error.message);
        }
        console.log(error);
      });
    }
  }
  getOrders() {
    console.log(this.state.token);
    this.setState({regLoader: true})
    var config = {
      headers: {Authorization: 'Bearer ' + this.state.token},
      timeout: 20000,
    };
    axios
      .get(API_URL + 'orders', config)
      .then(response => {
        console.log(response);
        if (response.data && response.data.length > 0) {
          console.log('response.data');
          console.log('here' + response.data);
          var len = response.data.length;
          this.setState({completed: [],});
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
             if (row.stage == 'completed' && !row.delivery) {
              this.setState(prevState => ({
                completed: [...prevState.completed, row],
              }));
            } 
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
  hide(type){
      if(type == 'completed'){
          this.setState({completed_menu: false})
      }
  }
  menuPress = (value, data) => {
   this.setState({selected_order_id: data.orderID})
   if(value == 'completed'){
    this.setState({selected_locker_id: data.locker_id,
        selected_locker_code: data.locker_code, selected_name: data.driver_name,
    selected_driver_name: data.driver_name}, ()=> this.setState({completed_menu: true}));
  //  this.setState({completed_menu: true})
    }
  }
  render() {
    let completed = (
        <FlatList
        data={this.state.completed}
        extraData={this.state}
        renderItem={({item, index}) => (
          <OrderBox
            orderID={item.order_id}
            menuPress={this.menuPress}
            orderType={item.stage}
            driver_name={item.driver_name}
            locker_number={item.locker_id}
            locker_code={item.locker_code}
            name={item.user_name}
            id={item._id}
          />
        )}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
    );
    return (
      <View style={styles.container}>
        <NormalHeader 
            text={'Deliveries'}
        />
        {this.state.regLoader ? 
          <View style={styles.loaderBody}>
            <ActivityIndicator size={'large'} color={'#1bc47d'} />
            <Text style={{fontFamily: 'Gilroy-Medium', marginTop: 20}}>
              Loading Deliveries
            </Text>
          </View>
        : <Fragment>
        {completed}
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
export default Deliveries;
