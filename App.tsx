/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect} from 'react';
import {View, ActivityIndicator, Text,Alert } from 'react-native';
import {SplashScreen} from './src/screens/splash.screens';
import {LoginScreen} from './src/screens/login.screen';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import messaging from '@react-native-firebase/messaging';
// import { initializeApp } from '@react-native-firebase/app'; 
import {AuthenticationContextProvider} from './src/services/auth/authcontext';
import {RootStackScreen} from './src/navigation/account.navigator';

 
const firebaseConfig = {
  apiKey: "AIzaSyBeh-wXYTrz0kGaOAxeBAbp8IYXrFUo9IM",
  authDomain: "dgpara-b457e.firebaseapp.com",
  projectId: "dgpara-b457e",
  storageBucket: "dgpara-b457e.appspot.com",
  messagingSenderId: "844275819270",
  appId: "1:844275819270:web:0d992d9e03dc99fd2b7487",
  databaseURL: "https://dgpara-b457e-default-rtdb.firebaseio.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default function App() {

  useEffect(() => {
    // Ensure Firebase is initialized before requesting permission
  //  const app = initializeApp(firebaseConfig);
  //  if (!firebase.apps.length) {
  //   firebase.initializeApp(firebaseConfig);
  // }
    // Request permission for notifications
    // async function requestUserPermission() {
    //   try {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //       console.log('Authorization status:', authStatus);
    //       const token= await messaging().getToken();
    //       console.log("Token: ",token);
          
    //     }
    //   } catch (error) {
    //     console.error('Error requesting permission:', error);
    //   }
    // }
    // requestUserPermission();

    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    // return unsubscribe;
  }, []);

  // msg token:  dthptouLT6CfJR1jEmvx6p:APA91bFSXmGsPHAVsy94P1XjO3JWiZ3yndSkZQI_boePmgmn5zYh9GYuoXYDLvY5iyN-I2pL8IdcLofI4zlyZl97e6flu0TUULyzkAhE1WrErTZ7hjPNPUqxeqDkuphQxcph1nL7bagy
  return (
    <AuthenticationContextProvider>
      <NavigationContainer>
        <RootStackScreen navigation={null} />
      </NavigationContainer>
    </AuthenticationContextProvider>
  );
}
