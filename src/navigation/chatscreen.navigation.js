import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {ChatScreen} from '../screens/chatscreen';
import {AccountScreen} from '../screens/Accountscreen';
import { CameraScreen } from '../screens/camera.screen';
import { PhotoProvider } from '../services/auth/PhotoContext'
const ChatStack = createStackNavigator();

export const ChatStackScreen = ({navigation}) => (
  <PhotoProvider>
    <ChatStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
      <ChatStack.Screen name="AccountScreen" component={AccountScreen} />
      <ChatStack.Screen name = "Camera" component={CameraScreen}/>
    </ChatStack.Navigator>
  </PhotoProvider>
);
