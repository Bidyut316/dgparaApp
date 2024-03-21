import React, { useState } from 'react';
import { View, Image, TouchableOpacity,Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const FullImageScreen = ({ route }) => {
  const { imageUrl } = route.params;
  const [rotation, setRotation] = useState(0);
  const navigation = useNavigation();
  const rotateImage = () => {
    setRotation(rotation => rotation + 90);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 15, left: 15, zIndex: 1 }}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={rotateImage} style={{ position: 'absolute', top: 15, right: 15, zIndex: 1 }}>
          <Icon name="rotate-right" size={30} color="green" />
        </TouchableOpacity>
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            transform: [{ rotate: `${rotation}deg` }],
          }}
          source={{ uri: imageUrl }}
        />
      </View>
    </View>
  );
};

export default FullImageScreen;
