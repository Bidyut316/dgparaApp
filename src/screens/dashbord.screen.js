// import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GalleryScreen} from './galley.screen';
import {HomeScreen} from './home.screen';
import {AddScreen} from './Add.screen';
import {ListScreen} from './listScreen';
import {ChatScreen} from './chatscreen';
import {ChatStackScreen} from '../navigation/chatscreen.navigation';
import {MatchdataContextProvider} from '../services/auth/matchdata';

const Tab = createMaterialTopTabNavigator();

const TAB_ICON = {
  Home: 'home',
  Images: 'images',
  List: 'list',
  Add: 'add-circle',
  Chat: 'chatbox-ellipses',
};

const createScreenOptions = ({route}) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({size, color}) => (
      <Ionicons name={iconName} size={25} color={color} />
    ),
    tabBarStyle: {backgroundColor: '#0c6948'},
    tabBarActiveTintColor: '#00bfff',
    tabBarInactiveTintColor: 'white',
  };
};

export const NavigationMaterial = () => {
  return (
    <MatchdataContextProvider>
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Images" component={GalleryScreen} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="List" component={ListScreen} />
        <Tab.Screen name="Chat" component={ChatStackScreen} />
      </Tab.Navigator>
    </MatchdataContextProvider>
  );
};
