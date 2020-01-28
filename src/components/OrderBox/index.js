import React from 'react';
import {TouchableOpacity, View, Text, ActivityIndicator, Image} from 'react-native';

import styles from './styles/styles.orderbox';

const OrderBox = ({orderID, orderType, date, locker_number, locker_code, 
  menuPress = () => {}, address, description, driver_name, name, id,pickup, sub_stage, delivery }) => {
  let data = {}; 
    data.orderID = orderID;
    data.id = id;
  if(orderType == 'pending'){
    data.address = address;
    data.description = description;
    data.date = date;
    data.name = name;
  }
   if(orderType == 'active' || orderType == 'completed'){
     data.locker_id = locker_number;
     data.locker_code = locker_code;
     data.name = name;
     data.driver_name = driver_name;
     data.pickup = pickup;
     data.sub_stage = sub_stage;
     data.delivery = delivery
  }
  return (
    <View style={styles.container}>
        <View style={styles.textColumn}>
            <Text style={styles.orderIdText}>
               {orderID}
            </Text>
           {orderType == 'pending' && <Text style={styles.dateText}>
               {date}
            </Text> }
            {orderType != 'pending'  && <Text style={styles.dateText}>
              Locker Number:  {locker_number}
            </Text> }
            {orderType != 'pending' && <Text style={styles.dateText}>
              Locker Code:  {locker_code}
            </Text> }
        </View>
            <View style={styles.line} />
            <TouchableOpacity activeOpacity={0.7}
            onPress={()=>menuPress(orderType, data)}>
           <View style={styles.viewDetailsView}>
              <Text style={styles.viewText}>View Details</Text>
              <Image
               source={require('../../assets/icons/view.png')}
               style={{width: 18, height: 18}}
               />
           </View></TouchableOpacity>
          {orderType == 'pending' &&
          <View style={styles.pendingOrderView}>
          <Text style={styles.orderTypeText}>Pending</Text>
          </View>
          }
          {orderType == 'active' &&
          <View style={styles.activeOrderView}>
          <Text style={styles.orderTypeText}>Active</Text>
          </View>
          }
          {orderType == 'completed' &&
          <View style={styles.completedOrderView}>
          <Text style={styles.orderTypeText}>Completed</Text>
          </View>
          }
    </View>
  );
};

export default OrderBox;
