import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Image
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/styles.orderheader';

class OrderHeader extends Component {
  render() {
    const {
      value,
      onTextInput,
      active,
      pending,
      completed,
      all,
    } = this.props;
    return (
      <View style={styles.headerView}>
        <Image
          source={require('../../../assets/images/topAbstract.png')}
          resizeMode={'contain'}
          style={{
            position: 'absolute',
            width: 187,
            height: 50,
            top: 0,
            right: 0,
          }}
        />
        <View style={styles.orderRow}>
          <Text style={styles.hiText}>Orders</Text>
          <TouchableOpacity activeOpacity={0.7}
          onPress={()=> this.props.navigation.navigate('Notifications')}>
          <Image
            source={require('../../../assets/icons/notification.png')}
            resizeMode={'contain'}
            style={{width: 25, height: 25, opacity: 1}}
          /></TouchableOpacity>
        </View>
        <View style={styles.orderTextInputView}>
          <View style={styles.searchIcon}>
            <MaterialIcon name="search" color={'#000'} size={15} />
          </View>
          <TextInput
            style={styles.input}
            keyboardType={'text'}
            placeholder={'Search for order id'}
            placeholderTextColor="#000"
            onChangeText={onTextInput}
            value={value}
          />
        </View>
        <View style={styles.tabview}>
          {all ? (
            <TouchableOpacity onPress={()=>this.props.tabPress('all')} activeOpacity={0.7}>
              <Text style={styles.tabOnlineText}>All</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={()=>this.props.tabPress('all')} activeOpacity={0.7}>
              <Text style={styles.tabOfflineText}>All</Text>
            </TouchableOpacity>
          )}
          {pending ? (
            <TouchableOpacity onPress={()=>this.props.tabPress('pending')} activeOpacity={0.7}>
              <Text style={styles.tabOnlineText}>Pending</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={()=>this.props.tabPress('pending')} activeOpacity={0.7}>
              <Text style={styles.tabOfflineText}>Pending</Text>
            </TouchableOpacity>
          )}
          {active ? (
            <TouchableOpacity onPress={()=>this.props.tabPress('active')} activeOpacity={0.7}>
              <Text style={styles.tabOnlineText}>Active</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={()=>this.props.tabPress('active')} activeOpacity={0.7}>
              <Text style={styles.tabOfflineText}>Active</Text>
            </TouchableOpacity>
          )}
          {completed ? (
            <TouchableOpacity
              onPress={()=>this.props.tabPress('completed')}
              activeOpacity={0.7}>
              <Text style={styles.tabOnlineText}>Completed</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={()=>this.props.tabPress('completed')}
              activeOpacity={0.7}>
              <Text style={styles.tabOfflineText}>Completed</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

export default OrderHeader;
