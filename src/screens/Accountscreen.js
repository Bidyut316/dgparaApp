import React, {useContext, useState,useCallback } from 'react';
import {Avatar, Button} from 'react-native-paper';
import styled from 'styled-components';
import {AuthenticationContext} from '../services/auth/authcontext';
import {View, Text, StyleSheet, TouchableOpacity,Animated,Easing  } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {usePhotoContext} from '../services/auth/PhotoContext'
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'firebase/compat/app';


// import CustomActionSheet from './../components/CustomActionSheet';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import {useFocusEffect} from '@react-navigation/native';
export const Profile = ({ text, icon,func }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => func()}>
        <Ionicons name={icon} size={25} color='purple' />
      </TouchableOpacity>
      <Text>
       {text}
      </Text>
    </View>
  );
}

const AvatarContainer = styled.View`
  align-items: center;
  margin-top: 4px;
`;
const SlideInView = ({ isVisible, children }) => {
  const slideAnimation = new Animated.Value(isVisible ? 0 : 1);

  React.useEffect(() => {
  Animated.timing(slideAnimation, {
    toValue: isVisible ? 1 : 0,
    duration: 1000, // Increase the duration to slow down the animation
    easing: Easing.linear, // Use linear easing for a constant speed
    useNativeDriver: true,
  }).start();
  }, [isVisible]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: slideAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [200, 0],
            }),
          },
        ],
      }}>
      {children}
    </Animated.View>
  );
};

export const AccountScreen = ({navigation}) => {
  const {onLogout, user} = useContext(AuthenticationContext);
  const { photo,deleteProfileImage,setPhoto } = usePhotoContext();

  // const [photo, setPhoto] = useState(null);
  const profilePhotoUpdateByCamera = () => {
     setActionSheetVisible(!isActionSheetVisible);
     navigation.navigate('Camera');
    };
    const pickProfileImage = async() => {
      ImagePicker.openPicker({
        width: 200,
        height: 200,
        cropping: true,
        cropperCircleOverlay: true,
        mediaType: 'photo',
      })
        .then(async image => {
          await deleteProfileImage();
          const response = await fetch(image.path);
          const blob = await response.blob();
          const ref = firebase.storage().ref().child(`profiles/${user.uid}`);
          await ref.put(blob);
          const url = await ref.getDownloadURL();
          setPhoto(url);
          setActionSheetVisible(!isActionSheetVisible);
        })
        .catch(error => {
          console.log(error);
        });
    };
  const profilePhotoUpdateByGallery = async() => {
    console.log("gallery");
    await pickProfileImage();
    };
  const profilePhotoRemove = async () => {
    console.log("Remove");
    await deleteProfileImage();
    setPhoto(null);
    setActionSheetVisible(!isActionSheetVisible);
    };

  const getProfilePicture = async currentUser => {
    try{
      // const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
      // setPhoto(photoUri);
      console.log("jj")
    }catch(error){
      console.error('Error getting profile picture:', error);
    }
   
  };
  const [isVisible, setIsVisible] = useState(false);
  const handlePress = () => {
    setIsVisible(!isVisible);
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfilePicture(user);
    }, [user]),
  );
  const [isActionSheetVisible, setActionSheetVisible] = useState(false);

  const toggleActionSheet = () => {
    setActionSheetVisible(!isActionSheetVisible);
  };
  const CustomActionSheet = ({ isVisible, onClose }) => {
    return (
      <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
              <View style={{backgroundColor:'#8E9396',borderTopEndRadius:20,borderTopLeftRadius:20,height:250,padding:10}}>
                   <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Profile photo</Text>
                   <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',flex:1,margin:5}}>
                     <Profile text='Camera' icon='camera-outline' func={profilePhotoUpdateByCamera}/>
                     <Profile text='Gallery' icon='image-outline' func={profilePhotoUpdateByGallery}/>
                     <Profile text='Remove' icon='trash-outline' func={profilePhotoRemove}/>
                   </View>
                   <TouchableOpacity style={styles.cancel} onPress={toggleActionSheet}>
                     <Text>Cancel</Text>
                </TouchableOpacity>
             </View>
             
      </Modal>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor:'white',padding:10 }}>

          <View style={styles.container}>
            <AvatarContainer>
              {/* <TouchableOpacity onPress={() => navigation.navigate('Camera')}> */}
              <TouchableOpacity onPress={toggleActionSheet}>
                {!photo && <Avatar.Icon size={180} icon="human" color="#696AC3" />}
                {photo && (
                  <Avatar.Image
                    size={180}
                    source={{uri: photo}}
                    backgroundColor="#2182BD"
                  />
                )}
              </TouchableOpacity>
            </AvatarContainer>
            <View style={{flexDirection: 'row',margin:10,justifyContent:'center'}}>
              <Feather name="mail" size={30} color="black" />
              <Text style={[styles.text, {marginLeft: 10}]}>{user.email}</Text>
            </View>
          </View>
            <View>
              <Button style={styles.submitbutton} mode="contained" onPress={onLogout}>
                <Text style={styles.buttonText}>Logout</Text>
              </Button>
            </View>
            <CustomActionSheet isVisible={isActionSheetVisible} onClose={toggleActionSheet} />
    </View>
      //  <SlideInView isVisible={isVisible}>
      //     <View style={{backgroundColor:'#8E9396',borderTopEndRadius:20,borderTopLeftRadius:20,height:150,padding:10}}>
      //           <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Profile photo</Text>
      //           <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',flex:1,margin:5}}>
      //             <Profile text='Camera' icon='camera-outline' func={profilePhotoUpdateByCamera}/>
      //             <Profile text='Gallery' icon='image-outline' func={profilePhotoUpdateByGallery}/>
      //             <Profile text='Remove' icon='trash-outline' func={profilePhotoRemove}/>
      //           </View>
      //     </View>
      // </SlideInView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 23,
    color: 'black',
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  submitbutton: {
    marginVertical: 15,
    backgroundColor: '#1d49db',
    padding: 8,
    borderRadius: 4,
    width: '50%',
    marginLeft: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 21,
    textAlign: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
   
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 16,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cancel: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: '#ccc',
  },
});
