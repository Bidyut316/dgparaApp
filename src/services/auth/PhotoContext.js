// PhotoContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {AuthenticationContext} from './authcontext';
import firebase from 'firebase/compat/app';


const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [photo, setPhoto] = useState(null);
console.log("photo contest <<===================================>>")
const {user} = useContext(AuthenticationContext);
const deleteProfileImage = async () => {
  try {
    const userImageRef = firebase.storage().ref(`profiles/${user.uid}`);
    await userImageRef.delete();
    console.log('Previous image deleted.');
  } catch (deleteError) {
    // Handle error if the file doesn't exist (404 error)
    if (deleteError.code !== 'storage/object-not-found') {
      console.error('Error deleting previous image:', deleteError);
    }else{
      console.log('No previous image found.');
    }
  }
};
useEffect(() => {
  // Fetch the user's image from Firebase and set it in the context
  const fetchUserImage = async () => {
    try {
      const userImageRef = firebase.storage().ref(`profiles/${user.uid}`);
      const url = await userImageRef.getDownloadURL();
      setPhoto(url);
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        // Handle specifically the case when the file is not found
        setPhoto(null);
        // console.warn('User image not found.');
      } else {
        // Handle other errors
        setPhoto(null);
        // console.error('Error fetching user image:', error);
      }
    }
  };

  if (user) {
    fetchUserImage();
  }
}, [user]);
  return (
    <PhotoContext.Provider value={{ photo, setPhoto,deleteProfileImage }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => useContext(PhotoContext);
