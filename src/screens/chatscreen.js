import React, {useState, useCallback, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FAB} from 'react-native-paper';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import {AccountScreen} from './Accountscreen';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import moment from 'moment';
import { AuthenticationContext } from '../services/auth/authcontext';
import {Avatar} from 'react-native-paper';
import styled from 'styled-components';
import {usePhotoContext} from '../services/auth/PhotoContext'

const AvatarContainer = styled.View`
  align-items: center;
  margin-top: 4px;
`;


export function ChatScreen({navigation,route}) {
  const { user} = useContext(AuthenticationContext);
  const { photo } = usePhotoContext();

  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Wellcome to dgpara',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ]);
  console.log("User id:=====> ",user.uid);

  const getCurrentDateTime = (timestamp) => {
    const dateTime = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    return dateTime;
  };
  // load chat message
  // const getAllMessages = async () => {
  //   try {
  //     const db = firebase.database();
  //     const myRef = db.ref('messages');
  //     myRef.on('value', (snapshot) => {
  //       const messages = [];
  //       snapshot.forEach((childSnapshot) => {
  //         const message = childSnapshot.val();
  //         console.log(message);
  //         messages.push({
  //           ...message,
  //         });
  //       });
  //       console.log("messages: ",messages.length);
  //       console.log("messages: ",messages.length);

  //       if (messages.length>0) {
  //         setMessages(messages);
  //       }
  //     });
   

  //     // // Step 1: Parse createdAt strings into Date objects
  //     for (let message of messages) {
  //       message.createdAt = moment(getCurrentDateTime(message.createdAt));
  //       // console.log("Date Time=====>> ",message.createdAt);
  //     }

  //     // Step 2: Sort messages in descending order based on Date objects
  //     const sortedMessages = messages.sort(
  //       (a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()
  //     );

  //     // Step 3: Convert sorted messages back to the original format
  //     for (let message of sortedMessages) {
  //       message.createdAt = message.createdAt.format('YYYY-MM-DD HH:mm:ss');
  //     }
  //     // console.log(sortedMessages);
  //     setMessages(sortedMessages);
  //   } catch (error) {
  //     console.error('Error fetching messages:', error);
  //   }
  //   // });
  // };

  // useEffect(() => {
  //   getAllMessages();
  // }, [messages]);
  const getAllMessages = async () => {
    try {
      const db = firebase.database();
      const myRef = db.ref('messages');
      myRef.on('value', (snapshot) => {
        const messages = [];
        snapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val();
          // console.log(message);
          messages.push({
            ...message,
          });
        });

        // Sort messages by createdAt
        const sortedMessages = messages.sort(
          (a, b) => b.createdAt - a.createdAt
        );

        setMessages(sortedMessages);
        // console.log("User:::: ",user)
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []); 


  // end load chat message
 


  const onSend = (messageArray) => {
    const msg = messageArray[0];
    const mymsg = {
      ...msg,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, mymsg)
    );
    const db = firebase.database();
    const myRef = db.ref('messages'); // Update the path here

    const newMessageRef = myRef.push();
    const newMessageId = newMessageRef.key;

    const newMessage = {
      messageId: newMessageId, // Add the new ID here
      ...mymsg, 
     
    };

    newMessageRef.set(newMessage);
  };

  return (
    
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <View style={{alignItems:'center',backgroundColor:'#00bfff',flexDirection:'row',padding:3}}>

      <AvatarContainer>
          <TouchableOpacity onPress={() => navigation.navigate('AccountScreen')}>
          {!photo && <Avatar.Icon size={40} icon="human" color="#696AC3" />}
                {photo && (
                  <Avatar.Image
                    size={40}
                    source={{uri: photo}}
                    backgroundColor="#696AC3"
                  />
                )}
          </TouchableOpacity>
        </AvatarContainer>

      <Text style={{fontWeight:'bold',marginLeft:5}}> {user.email}</Text>
      </View>
      {/* <FAB
        style={styles.fab}
        icon="face-man-profile"
        color="black"
        onPress={() => navigation.navigate('AccountScreen')}
      /> */}
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        onPressAvatar={() => navigation.navigate('AccountScreen')}
        user={{
          _id: user.uid,
          name:user.email,//displayName
          avatar: 'https://placeimg.com/140/140/any',
        }}  
        renderBubble={props => {
          return (
            <View style={{ backgroundColor: '#0e5e36',
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 5,}}>
            <View style={{ alignSelf: 'flex-start', }}>
                <Text style={{color:'#03a1fc',fontFamily:'bold'}}>{props.currentMessage.user.name}</Text>
            </View>
            {/* <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: 'green',
                  padding: 1,
                },
                left: {
                  backgroundColor: 'green',
                  padding: 1,
                },
              }}
              textStyle={{
                left: {
                  color: 'white', // Set the text color for left side here
                },
              }}  
              timeTextStyle={{
                left: {
                  color: 'white', // Set the text color for time in left side bubble
                  fontWeight: 'bold',
                },
              }}
  
            /> */}
            <View style={{backgroundColor:'#0e5e36',padding:5,borderRadius: 10,
            flexDirection: props.currentMessage.text.length <= 20 ? 'row' : 'column',
            }}>
              <Text style={{color: 'white',fontWeight:'bold',fontSize:15}}>
                {props.currentMessage.text}
              </Text>
              <Text style={{fontSize: 10, color: 'white',fontWeight:'bold',alignSelf:'flex-end',
               marginLeft: props.currentMessage.text.length <= 20 ? 15 : 0,
            }}>
                {moment(props.currentMessage.createdAt).format('LT')}
              </Text>
          </View>

            </View>
          );
        }}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{borderTopWidth: 1.5, borderTopColor: 'green'}}
              textInputStyle={{color: 'black'}}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 150,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 1,
  },
});
