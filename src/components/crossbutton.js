import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CrossButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="close-circle" size={30} color="#0e7afb" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default CrossButton;
