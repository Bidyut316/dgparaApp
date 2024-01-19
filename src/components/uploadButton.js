import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';

const ImageUploadButton = ({ updateImages }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    })
      .then(async image => {
        setSelectedImage(image.path);
        const response = await fetch(image.path);
        // Alert.alert("response",response);
        const blob = await response.blob();
        const imageName = image.path.substring(image.path.lastIndexOf('/') + 1);
        const ref = firebase.storage().ref().child(`images/${imageName}`);
        const path = `images/${imageName}`;
        // console.log('Firebase Image Path: ', path);
        const created = new Date(); // Set the current date as the creation date

        // Imagepath(path);
        await ref.put(blob);
        const url = await ref.getDownloadURL();
      // Send the new image data back to the parent component
      updateImages({ url, created });

      })
      .catch(error => {
        console.log(error);
      });
  };

  return (

    <View style={{alignItems: 'center', flexDirection: 'row',margin:10,justifyContent:'center'}}>
      <TouchableOpacity onPress={null} style={styles.cameraButton}>
        <Ionicons name="camera" size={30} color="white" />
      </TouchableOpacity>
      <Button mode="contained" style={styles.submitbutton} onPress={pickImage}>
        <Text style={styles.buttonText}> Upload Images </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  submitbutton: {
    // marginVertical: 10,
    backgroundColor: '#1d49db',
    padding: 8,
    borderRadius: 4,
    width: '60%',
    marginHorizontal:25,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  cameraButton: {
    backgroundColor: '#1d49db',
    padding: 15,
    borderRadius: 50,
    marginHorizontal:15,
  },
});

export default ImageUploadButton;
