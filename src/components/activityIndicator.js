import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';

const Activity = ({text}) => {
  return (
    <>
    <View style={styles.container}>
      <View style={styles.activityContainer}>
        <ActivityIndicator size={100} color="#0000ff" />
      </View>
    </View>
        <Text style={styles.text}>{text}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'transparent',
    marginTop: 200,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
  },
});

export default Activity;
