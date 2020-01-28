import React from 'react';
import {TouchableOpacity, View, Text, ActivityIndicator, Image} from 'react-native';

import styles from './styles/styles.notificationbox';

const NotificationBox = ({text, date}) => {
 let date_n = '';
  return (
    <View style={styles.container}>
    <Text
    numberOfLines={2}
     style={styles.notificationText}>
        {text}
    </Text>
    <Text style={styles.timeText}>
        {date}
    </Text>
    </View>
  );
};

export default NotificationBox;
