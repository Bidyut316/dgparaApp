import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {GalleryScreen} from '../screens/galley.screen';
import FullImageScreen  from'../screens/FullImageScreen';
const imageStack = createStackNavigator();

export const ImageStackScreen = ({navigation}) => (

    <imageStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <imageStack.Screen name="imagegallery" component={GalleryScreen} />
      <imageStack.Screen name="FullImage" component={FullImageScreen} />
    </imageStack.Navigator>
);
