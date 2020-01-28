import React, { Component } from "react";
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
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { API_URL } from '../../../root.js';
import axios from "axios";
import styles from './styles/styles.login'
import Loader from "../../components/Loading/loader";
import firebase from "react-native-firebase";
class Login extends Component {
    static navigationOptions = {
      header: null,
      drawerLockMode: "locked-closed"
    };
    constructor(props) {
      super(props);
      this.state = {
       regLoader: false,
       email_text_input: false,
       password_text_input: false,
       email_error: '',
       password_error: '',
       email: '',
       password: '',
       error: false,
       error_message: '',
       fcmToken: ''
      };
    }
    // 08029694883
    async componentDidMount(){
      this.checkPermission();
    }
    async checkPermission() {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
          console.log("enabled")
          this.getToken();
      } else {
        console.log("unenabled")
          this.requestPermission();
      }
    }
    
      //3
    async getToken() {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
          fcmToken = await firebase.messaging().getToken();
          if (fcmToken) {
              // user has a device token
              this.setState({fcmToken});
              console.log(fcmToken);
              await AsyncStorage.setItem('fcmToken', fcmToken);
          }else{
            console.log("\n"+"\n"+"no token"+"\n"+"\n")
          }
      }else{
        console.log("here")
        this.setState({fcmToken});
        console.log(fcmToken);
      }
    }
    
      //2
    async requestPermission() {
      try {
          await firebase.messaging().requestPermission();
          console.log("admin authorised")
          // User has authorised
          this.getToken();
      } catch (error) {
          // User has rejected permissions
          console.log('permission rejected');
      }
    }
    async signIn(){
      let regg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (regg.test(this.state.email) === false) {
       Toast.show('Incorrect Credentials')
      } else if (this.state.password.length < 1 || this.state.email.length < 1) {
        Toast.show('Please fill all required fields')
      } else{
        this.setState({ regLoader: true });
        var bodyParameters = {
          email: this.state.email,
          password: this.state.password,
          device_token: this.state.fcmToken
        };
     //   Toast.show(API_URL);
        axios
        .post(API_URL+"login_admin", bodyParameters, {
          timeout: 20000
        })
        .then(async(response) => {
          console.log(response);
          let id = response.data.data._id;
          let token = response.data.token;
          const user_stats = {
          token: token,
          device_token: this.state.fcmToken,
          id: response.data.data._id
          };
          await AsyncStorage.setItem('user_stats', JSON.stringify(user_stats));
      //    await AsyncStorage.setItem('fcmToken', response.data.data.device_token);
          this.setState({ regLoader: false });
          Toast.show('Sign in successful');
          this.props.navigation.navigate("Dashboard", {});
            })
            .catch(error => {
              console.log(error);
              Toast.show(JSON.stringify(error.message),)
              this.setState({ regLoader: false }); 
              if (error.response) {
                Toast.show(error.response.message);
                console.log(JSON.stringify(error));
              }
            });
      }
  
    }
    render() {
      return (
       <View style={styles.container}>
       {/* <TouchableOpacity onPress={()=> this.props.navigation.goBack()}
       hitSlop={{left: 2, right: 2, top: 2, bottom: 2}}>
        <Image 
            source={require('../../assets/icons/back.png')}
            resizeMode={'contain'}
            style={styles.leftImage}
        />
        </TouchableOpacity> */}
        <ScrollView></ScrollView>
        <View style={styles.bottomBox}>
        <ScrollView>
         <Text style={styles.createText}>Sign In</Text>
         <View style={styles.fullNameView}>
         <Text style={styles.fullNameText}>
         Email
         </Text>
         </View>
         <View style={this.state.email_text_input?styles.focusedTextFieldView:styles.textFieldView}>
         <TextInput
                underlineColorAndroid={"transparent"}
                allowFontScaling={false}
                placeholder="Enter Email"
                returnKeyType={'next'}
                ref={ (input) => {this.emailTextInput = input }}
                blurOnSubmit={false}
                onFocus={()=> this.setState({email_text_input: true})}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                onBlur={()=> this.setState({email_text_input: false})}
                onSubmitEditing={()=> {this.passwordTextInput.focus();}}
                placeholderTextColor="#B9B2B2"
                style={styles.textFieldInput}
                autoFocus={true}
              />
         </View>
         <View style={styles.fullNameView}>
         <Text style={styles.fullNameText}>
         Password
         </Text>
         </View>
         <View style={this.state.password_text_input?styles.focusedTextFieldView:styles.textFieldView}>
         <TextInput
                underlineColorAndroid={"transparent"}
                allowFontScaling={false}
                placeholder="Enter Password"
                returnKeyType={'next'}
                secureTextEntry={true}
                ref={ (input) => {this.passwordTextInput = input }}
                blurOnSubmit={false}
                value={this.state.password}
                onChangeText={password => this.setState({password})}
                onFocus={()=> this.setState({password_text_input: true})}
                onBlur={()=> this.setState({password_text_input: false})}
                onSubmitEditing={this.signIn.bind(this)}
                placeholderTextColor="#B9B2B2"
                style={styles.textFieldInput}
              />
         </View>         
         <TouchableOpacity onPress={this.signIn.bind(this)}>
         <View style={styles.continueView}>
            <Text style={styles.continueText}>
            Sign In
            </Text>
          </View></TouchableOpacity></ScrollView>

        </View>
       {this.state.regLoader?<Loader /> :null} 
       </View>
      );
    }
  }
  export default Login;
  