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
import styles from './styles/styles.progress';
import OrderBox from '../../../components/OrderBox/index';
import Loader from '../../../components/Loading/loader';
import NormalHeader from '../../../components/Header/NormalHeader/index';
import ProgressBottomMenu from '../../../components/BottomMenu/ProgressBottomMenu';
class Progress extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed',
  };
  constructor(props) {
    super(props);
    this.state = {
      regLoader: false,
      token: '',
      active: [],
      fetch: false,
      active_menu: false,
      selected_address: '',
      selected_description: '',
      selected_locker_id: '',
      selected_locker_code: '',
      selected_name: '',
      selected_driver_name: '',
      selected_order_id: '',
      selected_date: '',
      selected_substage: '',
      selected_id: '',
      cancel_loader: false
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
  getOrders() {
    this.setState({regLoader: true});
    console.log(this.state.token);
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
          this.setState({active: []});
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
            if (row.stage == 'active' && row.pickup) {
              this.setState(prevState => ({
                active: [...prevState.active, row],
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
  hide(type) {
    if (type == 'progress') {
      this.setState({active_menu: false});
    }
  }
  update_substage = (id,substage) =>{
    if(id){
      console.log('id' + id);
    this.setState({cancel_loader: true});
    var config = {
      headers: {Authorization: 'Bearer ' + this.state.token},
      timeout: 20000,
    };
    var bodyParameters = {
      order_id: id,
      sub_stage: substage,
    };
    axios
      .post(API_URL + 'orders/adminCharge', bodyParameters, config)
      .then(response => {
        console.log(response);
        Toast.show('Substage Succesfully Set!');
        this.getOrders();
        this.setState({cancel_loader: false, fetch: false, progress_menu: false, active_menu: false});
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
  menuPress = (value, data) => {
    this.setState({selected_order_id: data.orderID});
    if (value == 'active') {
      this.setState(
        {
          selected_locker_id: data.locker_id,
          selected_locker_code: data.locker_code,
          selected_name: data.driver_name,
          selected_driver_name: data.driver_name,
          selected_substage: data.sub_stage,
          selected_id: data.id,
        },
        () => this.setState({active_menu: true}),
      );
      //  this.setState({active_menu: true})
    }
  };
  completed(id){
    if(id){
      console.log('id' + id);
    this.setState({cancel_loader: true});
    var config = {
      headers: {Authorization: 'Bearer ' + this.state.token},
      timeout: 20000,
    };
    var bodyParameters = {
      order_id: id,
      stage: 'completed',
    };
    axios
      .post(API_URL + 'orders/adminCharge', bodyParameters, config)
      .then(response => {
        console.log(response);
        Toast.show('Pickup Succesfully Confirmed!');
        this.getOrders();
        this.setState({cancel_loader: false, fetch: false,progress_menu: false, active_menu: false});
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
  render() {
    let active = (
      <FlatList
        data={this.state.active}
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
            sub_stage={item.sub_stage}
          />
        )}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
    );
    let stage_array = ['processing', 'ready to drop', 'dropped off'];
    return (
      <View style={styles.container}>
        <NormalHeader text={'Update Progress'} />
        {this.state.regLoader ? (
          <View style={styles.loaderBody}>
            <ActivityIndicator size={'large'} color={'#1bc47d'} />
            <Text style={{fontFamily: 'Gilroy-Medium', marginTop: 20}}>
              Loading Orders
            </Text>
          </View>
        ) : (
          <Fragment>
            {active}
            {this.state.regLoader && <Loader />}
            {this.state.active_menu && <View style={styles.overlay} />}
            {this.state.active_menu && (
              <ProgressBottomMenu
                hide={this.hide.bind(this)}
                orderId={this.state.selected_order_id}
                name={this.state.selected_name}
                driver_name={this.state.driver_name}
                locker_id={this.state.selected_locker_id}
                locker_code={this.state.selected_locker_code}
                update_substage={this.update_substage.bind(this)}
                completed={this.completed.bind(this)}
                id={this.state.selected_id}
                processing={
                  stage_array.indexOf(this.state.selected_substage) != '-1'
                    ? true
                    : false
                }
                dropped_off={
                  this.state.selected_substage == 'dropped off' ? true : false
                }
                ready_to_drop={
                  this.state.selected_substage == 'ready to drop' 
                  || this.state.selected_substage == 'dropped off' 
                    ? true
                    : false
                }
              />
            )}
          </Fragment>
        )}
        {this.state.cancel_loader && <Loader />}
      </View>
    );
  }
}
export default Progress;
