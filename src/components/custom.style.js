import React from 'react';
import { View } from 'react-native';

const ErrorContainer = ({ children }) => {
  return (
    <View
      style={{
        maxWidth: 300,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 4,
        marginBottom: 4,
      }}
    >
      {children}
    </View>
  );
};

export default ErrorContainer;
