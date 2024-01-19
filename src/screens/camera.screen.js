import React,{useState,useRef,useContext,useEffect} from 'react';
import {View, Text, StyleSheet,TouchableOpacity, Alert, Linking,ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { CameraRoll } from "@react-native-camera-roll/camera-roll"; 
import { usePhotoContext } from '../services/auth/PhotoContext'
import {Avatar} from 'react-native-paper';
import {AuthenticationContext} from '../services/auth/authcontext';
import Ionicons from 'react-native-vector-icons/Ionicons';


export const CameraScreen = ({ navigation,route }) => {
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const device =isFrontCamera==true?useCameraDevice('front'):useCameraDevice('back')
  const cameraRef = useRef(null);
  const [testimg, setTestimg] = useState('https://source.unsplash.com/user/c_v_r/1900x800');
  const { setPhoto,deleteProfileImage } = usePhotoContext();
  const {user} = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${permission}`);
      if (permission === 'denied') {
        Alert.alert(
          'Camera Permission Denied',
          'Please enable camera permissions in app settings to use this feature.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
        );
      }
    };

    getPermission();
  }, []);
  const handleCapture = async () => {
    try {
    // Implement capture logic here
    setIsLoading(true);
    if (cameraRef.current ) {
      const storageRef = firebase.storage().ref(`profiles/${user.uid}`);
      const file = await cameraRef.current.takePhoto()
      const result = await fetch(`file://${file.path}`)
      const data = await result.blob();
      // try {
      //   await storageRef.delete();
      //   console.log('Previous image deleted.');
      // } catch (deleteError) {
      //   // Handle error if the file doesn't exist (404 error)
      //   if (deleteError.code !== 'storage/object-not-found') {
      //     console.error('Error deleting previous image:', deleteError);
      //   }else{
      //     console.log('No previous image found.');
      //   }
      // }
      await deleteProfileImage();
      const task = storageRef.put(data);

        task.then(async () => {
          const url = await storageRef.getDownloadURL();
          console.log('Image uploaded to Firebase:', url);
          setTestimg(url);
          setPhoto(url);
          // navigate('AccountScreen'); 
          setIsLoading(false);
          navigation.navigate('AccountScreen')
        });
    }
    console.log("Click");
  }catch (error) {
    console.error('Error capturing photo:', error);
  }
  };

  const toggleCamera = () => {
    setIsFrontCamera(prev => !prev);
    console.log(isFrontCamera);
  };

  if (device == null)  return <View><Text>No camera available</Text></View>;
  
  return (
    <View style={{flex:1}}>
      <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      photo={true}
      ref={cameraRef}
      onInitialized={() => {
        console.log('Camera is initialized');
        // You can add any additional logic here when the camera is initialized
      }}
    />
    <View>
    <Avatar.Image
                    size={180}
                    source={{uri: testimg}}
                    backgroundColor="#2182BD"
                  />
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2182BD" />
          <Text style={styles.loadingText}>Uploading...</Text>
        </View>
      )}
    <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCapture} style={styles.captureButton}>
          {/* <Text>Capture</Text> */}
          <Ionicons name="camera" size={30} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCamera} style={styles.toggleButton}>
          {/* <Text>Toggle Camera</Text> */}
          <Ionicons name="camera-reverse" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  captureButton: {
    backgroundColor: '#2182BD',
    padding: 15,
    borderRadius: 50,
    marginRight: 20,
  },
  toggleButton: {
    backgroundColor: '#2182BD',
    padding: 15,
    borderRadius: 50,
    marginLeft: 20,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#2182BD',
    fontSize: 16,
  },
});

// import React from 'react';
// import { View, TouchableOpacity,Text } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// // import  AsyncStorage  from '@react-native-async-storage/async-storage';

// export const CameraScreen = () => {
//   const takePicture = async (camera) => {
//     if (camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await camera.takePictureAsync(options);
//       console.log(data.uri);
//       // Do something with the picture data here, e.g., display it, upload it, etc.
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <RNCamera
//         style={{ flex: 1 }}
//         type={RNCamera.Constants.Type.back}
//         ref={(ref) => {
//           this.camera = ref;
//         }}
//       />
//       <TouchableOpacity
//         style={{ flex: 0, alignSelf: 'center', margin: 20 }}
//         onPress={() => this.takePicture(this.camera)}
//       >
//         <Text>Take Picture</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };


