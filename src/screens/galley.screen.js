import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView,Dimensions,TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {Card, Button} from 'react-native-paper';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import ImageUploadButton from '../components/uploadButton';
import moment from 'moment';

const ImageCardCover = styled(Card.Cover)`
  padding: 8px;
  color: 'green';
`;

export const GalleryScreen = ({navigation}) => {
  console.log(navigation);
  const [images, setImages] = useState([]);
  const updateImages = (newImage) => {
    setImages(prevImages => [newImage, ...prevImages]);
  };


  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const storageRef = firebase.storage().ref();
        const imagesRef = storageRef.child('images');

        const result = await imagesRef.listAll();

        const promises = result.items.map(async item => {
          const metadata = await item.getMetadata();
          // console.log('metadata: ', metadata);
          const url = await item.getDownloadURL();
          return {
            url: url,
            created: moment(
              moment(metadata.timeCreated).format('YYYY-MM-DD HH:mm:ss'),
            ),
          };
        });

        const downloadUrls = await Promise.all(promises);
        // console.log('downloadUrls:  ', downloadUrls);

        const sortedUrls = downloadUrls.sort(
          (a, b) => b.created.valueOf() - a.created.valueOf(),
        );

        setImages(sortedUrls);
        // console.log('sortedUrls  ', sortedUrls);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchImageUrls();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#00bfff'}}>
      <ImageUploadButton updateImages={updateImages} />
      <ScrollView style={{flex: 1}}>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 4,
        }}>
        {images.map((image, index) => (
  <TouchableOpacity
  key={index}
  
  onPress={() => navigation.navigate('FullImage', { imageUrl: image.url })}
  style={{
    height: Dimensions.get('window').width/2,
    width: '50%',
    padding: 4,
  }}>
    <View style={{ flex: 1, backgroundColor: '#cef5c4', padding: 3,borderRadius:5 }}>
  <Image
    style={{
      flex: 1,
      backgroundColor:'red',
      resizeMode: 'cover', // Ensuring the image fits within the container without cropping
      borderRadius:5
    }}
    source={{uri: image.url}}
  />
  </View>
</TouchableOpacity>
     
        ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flex: 0.5,
  },
  submitbutton: {
    marginVertical: 15,
    backgroundColor: '#1d49db',
    padding: 8,
    borderRadius: 4,
    width: '50%',
    marginLeft: 100,
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 21,
    textAlign: 'center',
  },
});
