import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Image,
  Animated,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/styles.pendingbottommenu';

class PendingBottomMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateValue: new Animated.Value(325),
    };
  }
  componentDidMount(){
    this.toggleDetails(true)
    console.log("sjsk "+this.props.id)
  }
  toggleDetails = shouldOpen => {
    let toValue = 0; // if we need to open our subView, we need to animate it to it original hight.
    //To do this, we will use 'transform: translateY(0)'
    if (!shouldOpen) {
      toValue = 325;
    } // if it's already open and we need to hide it, we will use 'transform: translateY(200)'
    Animated.spring(this.state.translateValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
    }).start(); // the actual animation
  };
  render() {
    const {orderId, date, address, order_description, id} = this.props;
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
            this.props.hide('pending');
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
            <Text 
            numberOfLines={2}
            style={styles.dateText}>{date}</Text>
          </View>
          <View style={styles.pendingOrderView}>
            <Text style={styles.orderTypeText}>Pending</Text>
          </View>
        </View>
        <View style={styles.customerView}>
          <Text style={styles.addressHeader}>Customer Address</Text>
          <Text style={styles.addressText}>{address}</Text>
        </View>
        <View style={styles.customerView}>
          <Text style={styles.addressHeader}>Order</Text>
          <Text style={styles.addressText}>{order_description}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7}
        onPress={() => this.props.cancel(id)}>
          <View style={styles.cancelButton}>
            <Text style={styles.orderTypeText}>CANCEL</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default PendingBottomMenu;
