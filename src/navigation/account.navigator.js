import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {SplashScreen} from '../screens/splash.screens';
import {LoginMain} from '../screens/login.screen';

const RootStack = createStackNavigator();

export const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="LoginScreen" component={LoginMain} />
  </RootStack.Navigator>
);
