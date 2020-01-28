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
import styles from './styles/styles.progressbottommenu';

class ProgressBottomMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateValue: new Animated.Value(325),
    };
  }
  componentDidMount() {
    this.toggleDetails(true);
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
    const {
      orderId,
      processing,
      ready_to_drop,
      dropped_off,
      completed,
      id
    } = this.props;
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
            this.props.hide('progress');
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
          </View>
          <View style={styles.pendingOrderView}>
            <Text style={styles.orderTypeText}>Active</Text>
          </View>
        </View>
        <View style={styles.markerView}>
          <View style={styles.circleOnline}>
            <Image
              source={require('../../../assets/icons/checkIcon.png')}
              style={{width: 19, height: 19}}
              resizeMode={'contain'}
            />
          </View>
          {processing ? (
            <View style={styles.squareOnline} />
          ) : (
            <View style={styles.squareOffline} />
          )}
          {processing ? (
            <View style={styles.circleOnline}>
              <Image
                source={require('../../../assets/icons/checkIcon.png')}
                style={{width: 19, height: 19}}
                resizeMode={'contain'}
              />
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.update_substage(id,'processing')}>
              <View style={styles.circleOffline}>
                <Image
                  source={require('../../../assets/icons/checkIcon.png')}
                  style={{width: 19, height: 19}}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>
          )}
          {ready_to_drop ? (
            <View style={styles.squareOnline} />
          ) : (
            <View style={styles.squareOffline} />
          )}
          {ready_to_drop ? (
            <View style={styles.circleOnline}>
              <Image
                source={require('../../../assets/icons/checkIcon.png')}
                style={{width: 19, height: 19}}
                resizeMode={'contain'}
              />
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.update_substage(id,'ready to drop')}>
              <View style={styles.circleOffline}>
                <Image
                  source={require('../../../assets/icons/checkIcon.png')}
                  style={{width: 19, height: 19}}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>
          )}
          {dropped_off ? (
            <View style={styles.squareOnline} />
          ) : (
            <View style={styles.squareOffline} />
          )}
          {dropped_off ? (
            <View style={styles.circleOnline}>
              <Image
                source={require('../../../assets/icons/checkIcon.png')}
                style={{width: 19, height: 19}}
                resizeMode={'contain'}
              />
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.update_substage(id,'dropped off')}>
              <View style={styles.circleOffline}>
                <Image
                  source={require('../../../assets/icons/checkIcon.png')}
                  style={{width: 19, height: 19}}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.squareOffline} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.props.completed(id)}>
            <View style={styles.circleOffline}>
              <Image
                source={require('../../../assets/icons/checkIcon.png')}
                style={{width: 19, height: 19}}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>Picked Up</Text>
          <Text style={styles.text}>Processing</Text>
          <Text style={styles.text}>Ready to drop</Text>
          <Text style={styles.text}>Dropped off</Text>
          <Text style={styles.text}>Completed</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.cancelButton}>
            <Text style={styles.orderTypeText}>READY</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default ProgressBottomMenu;
