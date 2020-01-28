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
import firebase from "react-native-firebase";
import styles from './styles/styles.home';
import OrderBox from '../../../components/OrderBox/index';
import Loader from '../../../components/Loading/loader';
import OrderHeader from '../../../components/Header/OrderHeader/index';
import PendingBottomMenu from '../../../components/BottomMenu/PendingBottomMenu';
import ActiveBottomMenu from '../../../components/BottomMenu/ActiveBottomMenu';
import CompletedBottomMenu from '../../../components/BottomMenu/CompletedBottomMenu';
import ProgressBottomMenu from '../../../components/BottomMenu/ProgressBottomMenu'
import DetailsBottomMenu from "../../../components/BottomMenu/DetailsBottomMenu"
class Home extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed',
  };
  constructor(props) {
    super(props);
    this.state = {
      regLoader: false,
      token: '',
      orders: [],
      active: [],
      pending: [],
      completed: [],
      s_orders: [],
      s_active: [],
      s_pending: [],
      s_completed: [],
      fetch: false,
      all_tab: true,
      active_tab: false,
      pending_tab: false,
      completed_tab: false,
      search_value: '',
      active_menu: false,
      pending_menu: false,
      completed_menu: false,
      details_menu: false,
      progress_menu:false,
     selected_address: '',
      selected_description: '',
      selected_locker_id: '',
      selected_locker_code: '',
      selected_name: '',
      selected_driver_name: '',
      selected_order_id: '',
      selected_date: '',
      selected_id: '',
      selected_substage: '',
      cancel_loader: false,
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
      .get(API_URL + 'orders/', config)
      .then(response => {
        console.log(response);
        if (response.data && response.data.length > 0) {
          console.log('response.data');
          console.log('here' + response.data);
          var len = response.data.length;
          this.setState({
            orders: [],
            pending: [],
            active: [],
            completed: [],
            s_orders: [],
            s_active: [],
            s_pending: [],
            s_completed: [],
            active_menu: false,
            pending_menu: false,
            completed_menu: false,
            selected_address: '',
            selected_description: '',
            selected_locker_id: '',
            selected_locker_code: '',
            selected_name: '',
            selected_driver_name: '',
            selected_order_id: '',
            selected_date: '',
            selected_id: '',
          });
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
            this.setState(prevState => ({
              orders: [...prevState.orders, row],
            }));
            this.setState(prevState => ({
              s_orders: [...prevState.s_orders, row],
            }));
            if (row.stage == 'pending') {
              this.setState(prevState => ({
                pending: [...prevState.pending, row],
              }));
              this.setState(prevState => ({
                s_pending: [...prevState.s_pending, row],
              }));
            } else if (row.stage == 'active') {
              this.setState(prevState => ({
                active: [...prevState.active, row],
              }));
              this.setState(prevState => ({
                s_active: [...prevState.s_active, row],
              }));
            } else {
              this.setState(prevState => ({
                completed: [...prevState.completed, row],
              }));
              this.setState(prevState => ({
                s_completed: [...prevState.s_completed, row],
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
          Toast.show(error.response.data.message);
          if(error.response.data.message == 'Token is not valid'){
            firebase.messaging().unsubscribeToTopic('admin');
            this.props.navigation.navigate('Login')
          }
        }
        console.log(JSON.stringify(error));
      });
  }
  cancel = id => {
    console.log('id' + id);
    this.setState({cancel_loader: true});
    var config = {
      headers: {Authorization: 'Bearer ' + this.state.token},
      timeout: 20000,
    };
    axios
      .delete(API_URL + 'orders/' + id, config)
      .then(response => {
        console.log(response);
        Toast.show('Order Cancelled Successfully');
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
  };
  tabPress = value => {
    if (value == 'completed') {
      this.setState({
        completed_tab: true,
        active_tab: false,
        all_tab: false,
        pending_tab: false,
      });
    }
    if (value == 'active' ) {
      this.setState({
        completed_tab: false,
        active_tab: true,
        all_tab: false,
        pending_tab: false,
      });
    }
    if (value == 'pending') {
      console.log('ppppppp');
      this.setState({
        completed_tab: false,
        active_tab: false,
        all_tab: false,
        pending_tab: true,
      });
    }
    if (value == 'all') {
      this.setState({
        completed_tab: false,
        active_tab: false,
        all_tab: true,
        pending_tab: false,
      });
    }
  };
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
        Toast.show('Delivery Succesfully Completed!');
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
  pickup(id){
    if(id){
      console.log('id' + id);
    this.setState({cancel_loader: true});
    var config = {
      headers: {Authorization: 'Bearer ' + this.state.token},
      timeout: 20000,
    };
    var bodyParameters = {
      order_id: id,
      pickup: true,
    };
    axios
      .post(API_URL + 'orders/adminCharge', bodyParameters, config)
      .then(response => {
        console.log(response);
        Toast.show('Pickup Succesfully Confirmed!');
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
  hide(type) {
    if (type == 'pending') {
      this.setState({pending_menu: false});
    }
    if (type == 'active') {
      this.setState({active_menu: false});
    }
    if (type == 'completed') {
      this.setState({completed_menu: false});
    }
    if (type == 'progress') {
      this.setState({progress_menu: false});
    }
    if (type == 'details') {
      this.setState({details_menu: false});
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
    this.setState({selected_order_id: data.orderID, selected_id: data.id});
    if (value == 'pending') {
      this.setState(
        {
          selected_address: data.address,
          selected_description: data.description,
          selected_date: data.date,
        },
        () => this.setState({pending_menu: true}),
      );
      //
    }
    if (value == 'active') {
      this.setState(
        {
          selected_locker_id: data.locker_id,
          selected_locker_code: data.locker_code,
          selected_name: data.driver_name,
          selected_driver_name: data.driver_name,
        },
        () => this.setState({active_menu: true}),
      );
      //  this.setState({active_menu: true})
    }
    if (value == 'active' && data.pickup) {
      this.setState(
        {
          selected_locker_id: data.locker_id,
          selected_locker_code: data.locker_code,
          selected_name: data.driver_name,
          selected_driver_name: data.driver_name,
          selected_substage:data.sub_stage
        },
        () => this.setState({progress_menu: true}),
      );
      //  this.setState({active_menu: true})
    }
    if (value == 'completed') {
      if(data.delivery){
        this.setState(
          {
            selected_locker_id: data.locker_id,
            selected_locker_code: data.locker_code,
            selected_name: data.name,
            selected_driver_name: data.driver_name,
          },
          () => this.setState({details_menu: true}),
        );
      }else{
              this.setState(
        {
          selected_locker_id: data.locker_id,
          selected_locker_code: data.locker_code,
          selected_name: data.name,
          selected_driver_name: data.driver_name,
        },
        () => this.setState({completed_menu: true}),
      );
      }

      //   this.setState({completed_menu: true})
    }
  };
  onTextInput(text) {
    this.setState({search_value: text});

    const active_data = this.state.active.filter(item =>
      item.order_id.toUpperCase().includes(text.toUpperCase()),
    );
    this.setState({
      s_active: active_data,
    });

    const pending_data = this.state.pending.filter(item =>
      item.order_id.toUpperCase().includes(text.toUpperCase()),
    );
    this.setState({
      s_pending: pending_data,
    });

    const completed_data = this.state.completed.filter(item =>
      item.order_id.toUpperCase().includes(text.toUpperCase()),
    );
    this.setState({
      s_completed: completed_data,
    });

    const data = this.state.orders.filter(item =>
      item.order_id.toUpperCase().includes(text.toUpperCase()),
    );
    this.setState({
      s_orders: data,
    });
  }
  render() {
    let all = (
      <FlatList
        data={this.state.s_orders}
        extraData={this.state}
        renderItem={({item, index}) => (
          <OrderBox
            orderID={item.order_id}
            menuPress={this.menuPress}
            date={
              item.stage == 'pending' &&
              moment(item.pickup_date).format('dddd, MMMM Do YYYY')
            }
            orderType={item.stage}
            address={item.address}
            description={item.preferences}
            driver_name={item.driver_name}
            locker_number={item.locker_id}
            locker_code={item.locker_code}
            name={item.user_name}
            navigation={this.props.navigation}
            id={item._id}
            pickup={item.pickup}
            delivery={item.delivery}
            sub_stage={item.sub_stage}
          />
        )}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
    );
    let pending = (
      <FlatList
        data={this.state.s_pending}
        extraData={this.state}
        renderItem={({item, index}) => (
          <OrderBox
            orderID={item.order_id}
            menuPress={this.menuPress}
            date={
              item.stage == 'pending' &&
              moment(item.pickup_date).format('dddd, MMMM Do YYYY')
            }
            orderType={item.stage}
            address={item.address}
            description={item.preferences}
            driver_name={item.driver_name}
            locker_number={item.locker_id}
            locker_code={item.locker_code}
            name={item.user_name}
            id={item._id}
            pickup={item.pickup}
            delivery={item.delivery}
            sub_stage={item.sub_stage}
          />
        )}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
    );
    let active = (
      <FlatList
        data={this.state.s_active}
        extraData={this.state}
        renderItem={({item, index}) => (
          <OrderBox
            orderID={item.order_id}
            menuPress={this.menuPress}
            date={
              item.stage == 'pending' &&
              moment(item.pickup_date).format('dddd, MMMM Do YYYY')
            }
            orderType={item.stage}
            address={item.address}
            description={item.preferences}
            driver_name={item.driver_name}
            locker_number={item.locker_id}
            locker_code={item.locker_code}
            name={item.user_name}
            id={item._id}
            pickup={item.pickup}
            delivery={item.delivery}
            sub_stage={item.sub_stage}
          />
        )}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
    );
    let completed = (
      <FlatList
        data={this.state.s_completed}
        extraData={this.state}
        renderItem={({item, index}) => (
          <OrderBox
            orderID={item.order_id}
            menuPress={this.menuPress}
            date={
              item.stage == 'pending' &&
              moment(item.pickup_date).format('dddd, MMMM Do YYYY')
            }
            orderType={item.stage}
            address={item.address}
            description={item.preferences}
            driver_name={item.driver_name}
            locker_number={item.locker_id}
            locker_code={item.locker_code}
            name={item.user_name}
            id={item._id}
            pickup={item.pickup}      
            delivery={item.delivery}
                  sub_stage={item.sub_stage}
          />
        )}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
    );
    let stage_array = ['processing', 'ready to drop', 'dropped off'];
    return (
      <View style={styles.container}>
        <OrderHeader
          tabPress={this.tabPress}
          pending={this.state.pending_tab}
          all={this.state.all_tab}
          active={this.state.active_tab}
          completed={this.state.completed_tab}
          value={this.state.search_value}
          onTextInput={value => this.onTextInput(value)}
          navigation={this.props.navigation}
        />
        {this.state.regLoader ? (
          <View style={styles.loaderBody}>
            <ActivityIndicator size={'large'} color={'#1bc47d'} />
            <Text style={{fontFamily: 'Gilroy-Medium', marginTop: 20}}>
              Loading Orders
            </Text>
          </View>
        ) : (
          <Fragment>
            {this.state.all_tab && all}
            {this.state.pending_tab && pending}
            {this.state.active_tab && active}
            {this.state.completed_tab && completed}
            {this.state.regLoader && <Loader />}
            {(this.state.pending_menu ||
              this.state.active_menu ||
              this.state.completed_menu || 
              this.state.progress_menu 
              || this.state.details_menu) && 
              <View style={styles.overlay} />}
            {this.state.pending_menu && (
              <PendingBottomMenu
                hide={this.hide.bind(this)}
                orderId={this.state.selected_order_id}
                date={this.state.selected_date}
                address={this.state.selected_address}
                order_description={this.state.selected_description}
                id={this.state.selected_id}
                cancel={this.cancel}
              />
            )}
            {this.state.active_menu && (
              <ActiveBottomMenu
                hide={this.hide.bind(this)}
                orderId={this.state.selected_order_id}
                name={this.state.selected_name}
                driver_name={this.state.driver_name}
                locker_id={this.state.selected_locker_id}
                locker_code={this.state.selected_locker_code}
                id={this.state.selected_id}
                pickup={this.pickup.bind(this)}
              />
            )}
            {this.state.completed_menu && (
              <CompletedBottomMenu
                hide={this.hide.bind(this)}
                orderId={this.state.selected_order_id}
                name={this.state.selected_name}
                driver_name={this.state.driver_name}
                locker_id={this.state.selected_locker_id}
                locker_code={this.state.selected_locker_code}
                id={this.state.selected_id}
                delivery={this.delivery.bind(this)}
              />
            )}
            {this.state.details_menu && (
              <DetailsBottomMenu
                hide={this.hide.bind(this)}
                orderId={this.state.selected_order_id}
                name={this.state.selected_name}
                driver_name={this.state.driver_name}
                locker_id={this.state.selected_locker_id}
                locker_code={this.state.selected_locker_code}
                id={this.state.selected_id}
                delivery={this.delivery.bind(this)}
              />
            )}
            {this.state.progress_menu  &&          
             <ProgressBottomMenu 
            hide={this.hide.bind(this)}
            orderId={this.state.selected_order_id}
            name={this.state.selected_name}
            completed={this.completed.bind(this)}
            driver_name={this.state.driver_name}
            locker_id={this.state.selected_locker_id}
            id={this.state.selected_id}
            locker_code={this.state.selected_locker_code}
            update_substage={this.update_substage.bind(this)}
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
            
        />}
          </Fragment>
        )}
        {this.state.cancel_loader && <Loader />}
      </View>
    );
  }
}
export default Home;
