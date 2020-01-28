import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Image,
  Animated
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/styles.completedbottommenu';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Loader from '../../Loading/loader'
import { RectButton } from "react-native-gesture-handler";

class CompletedBottomMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateValue: new Animated.Value(355),
      loader: false
    };
    this.onSwipeableLeftWillOpen = this.onSwipeableLeftWillOpen.bind(this)
  }
    componentDidMount(){
    this.toggleDetails(true)
  }
  componentDidUpdate() {
    if (this.props.animate) {
      this.toggleDetails(true);
      this.props.animate = false;
    }
  }
  toggleDetails = shouldOpen => {
    let toValue = 0; // if we need to open our subView, we need to animate it to it original hight.
    //To do this, we will use 'transform: translateY(0)'
    if (!shouldOpen) {
      toValue = 355;
    } // if it's already open and we need to hide it, we will use 'transform: translateY(200)'
    Animated.spring(this.state.translateValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
    }).start(); // the actual animation
  };
  onSwipeableLeftWillOpen(){
    this.props.delivery(this.props.id)
    }
    renderLeftActions = (progress, dragX) => {
      const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [-20, 0, 0, 1],
      });
      return (
        <RectButton style={styles.leftAction} onPress={this.close}>
          <Animated.Text
            style={{color: '#1bc47d'}}>
            Loading...
          </Animated.Text>
        </RectButton>
      );
    };
  render() {
    const {orderId, name, driver_name, locker_id, locker_code, id} = this.props;
    return (
      <Animated.View
        style={[
          styles.container,
         {transform: [{translateY: this.state.translateValue}]},
        ]}>
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{left: 5, top: 5, bottom: 5, right: 5}}
          onPress={() => {
            this.props.hide('completed');
            this.toggleDetails(false);
          }}>
          <View style={styles.closeMenuView}>
            <Image
              source={require('../../../assets/icons/closeMenu.png')}
              style={{width: 16, height: 16}}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.topView}>
          <View style={styles.textColumn}>
            <Text style={styles.orderIdText}>{orderId}</Text>
            <Text style={styles.dateText}>{name}'s Order</Text>
          </View>
          <View style={styles.pendingOrderView}>
            <Text style={styles.orderTypeText}>Completed</Text>
          </View>
        </View>
        <View style={styles.customerView}>
          <Text style={styles.addressHeader}>Driver name</Text>
          <Text style={styles.addressText}>{driver_name}</Text>
        </View>
        <View style={styles.customerView}>
          <Text style={styles.addressHeader}>Locker ID</Text>
          <Text style={styles.addressText}>{locker_id}</Text>
        </View>
        <View style={styles.customerView}>
          <Text style={styles.addressHeader}>Locker Code</Text>
          <Text style={styles.addressText}>{locker_code}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.bottomButton}>
          <Swipeable
onSwipeableLeftWillOpen={this.onSwipeableLeftWillOpen}
        renderLeftActions={this.renderLeftActions}> 
            <View style={styles.swipeView}>
              <Image
                source={require('../../../assets/icons/swipe.png')}
                resizeMode={'contain'}
                style={{height: 24, width: 48}}
              />
              <Text style={styles.swipeText}>Swipe to confirm Delivery</Text>
            </View></Swipeable>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default CompletedBottomMenu;
