import React, {Component} from 'react';
import AppContainer, {RootNavigator} from './src/navigation/index';
import firebase from "react-native-firebase";
import type { Notification, NotificationOpen } from "react-native-firebase";
import NavigationService from './src/navigation/NavigationService';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
  async componentDidMount() {
    const channel = new firebase.notifications.Android.Channel(
      'default',
      'Channel Name',
      firebase.notifications.Android.Importance.Max
    ).setDescription('A natural description of the channel');
    firebase.notifications().android.createChannel(channel);
    this.checkPermission();

    this.createNotificationListeners();
  };
  
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
  }
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }
  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    console.log("notification function");
    this.notificationListener = firebase.notifications().onNotification(notification => {
        console.log("received")
      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
           .ios.setBadge(notification.ios.badge)
          .android.setChannelId("default")
          .android.setPriority(firebase.notifications.Android.Priority.High)
          .android.setSmallIcon("@drawable/ic_stat_gw_cleaners_new")
          .android.setColor('#1bc47d');
        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
      });
  
    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        NavigationService.navigate("Notification", {
          // chatName: `${data.channelName}`,
          // chatId: `${data.channelId}`
        });
   //     this.showAlert.bind(this, title, body);
      });
  
    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
   //   this.showAlert.bind(this, title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  render() {
    return (
        <AppContainer  ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}/>
    );
  }
}
