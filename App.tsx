/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {SplashScreen} from './src/screens/splash.screens';
import {LoginScreen} from './src/screens/login.screen';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
 
  return (
    <AuthenticationContextProvider>
      <NavigationContainer>
        <RootStackScreen navigation={null} />
      </NavigationContainer>
    </AuthenticationContextProvider>
  );
}
