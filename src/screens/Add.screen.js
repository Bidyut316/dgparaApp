import React, {useState,useContext} from 'react';
import {View, Text, StyleSheet, Alert, KeyboardAvoidingView,ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import appendDataToJSON from '../api/appendTeamList';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import appendMatchData from '../api/appendTeamList';
import CrossButton from '../components/crossbutton';
import { MatchdataContext } from './../services/auth/matchdata'


export const TextContainer = styled.View`
  padding: 10px;
  margin-top: 4px;
`;
export const BackCover = styled.View`
  padding: 10px;
  margin-top: 15px;
  border-width: 2px; 
  border-color: #ccc; 
`;

export const InputText = styled(TextInput)`
  width: 320px;
  margin-bottom: 10px;
`;

export const TextCover = styled.View`
  flex: 1;
  align-items: center;
  background-color: #00bfff;
`;

export const SubButton = styled(Button).attrs({})`
  padding: 8px;
  background-color: #1d49db;
`;
export const AddScreen = () => {
  const { matchdata,setMatchdata } = useContext(MatchdataContext);

  const [Player1, setPlayer1] = useState('');
  const [Player2, setPlayer2] = useState('');
  const [Player3, setPlayer3] = useState('');
  const [Player4, setPlayer4] = useState('');
  const [errmsg, seterrmsg] = useState(null);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      if (Player1 == '' || Player2 == '' || Player3 == '' || Player4 == '') {
        seterrmsg('Player Name Should not Blank');
        setTimeout(() => {
          seterrmsg(null);
        }, 6000);
      } else {
        const data = {
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          wine: [Player1, Player2],
          lose: [Player3, Player4],
        };
        const msg = await appendMatchData(data);
        console.log('msg: ', msg);
        if (msg == 'Data stored successfully in Firebase') {
          // 
           // Combine existing data with new data
          const combinedData = [data,...matchdata];

          // Update context with combined data
          setMatchdata(combinedData);

          // 
          Alert.alert(
            'Alert Title',
            'Data stored successfully in Firebase',
            [{text: 'OK', onPress: () => navigation.navigate('Home')}],
            {cancelable: false},
          );
          setPlayer1('');
          setPlayer2('');
          setPlayer3('');
          setPlayer4('');
        } else {
          Alert.alert('Alert Title', 'Something went wrong');
        }
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  // appendDataToJSON("2023-06-27 13:37:18",{wine:["Bidyut3 wine","Bidyut3 wine"],lose:["Bidyut4 lose","Bidyut4 lose"]});
  // appendDataToJSON("2023-06-27 13:37:18", { wine: ["Bidyut3 wine", "Bidyut3 wine"], lose: ["Bidyut4 lose", "Bidyut4 lose"] });

  return (
  
   
    <TextCover>
      <Text style={{fontSize:35,color:'#cbe314',fontWeight:'bold',marginBottom:5,marginTop:10}}>Match Details</Text>
        <ScrollView>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <BackCover>
        <View >
          <Text style={styles.styletext1}> Win Team </Text>
          <TextContainer>
            <InputText
              label="Player1"
              value={Player1}
              autoCapitalize="words"
              onChangeText={P1 => setPlayer1(P1)}
              style={{backgroundColor:'white'}}
            />
            <InputText
              label="Player2"
              value={Player2}
              autoCapitalize="words"
              onChangeText={P2 => setPlayer2(P2)}
              style={{backgroundColor:'white'}}
            />
          </TextContainer>
        </View>
        <View>
          <Text style={styles.styletext2}> Loss Team </Text>
          <TextContainer>
            <InputText
              label="Player1"
              value={Player3}
              autoCapitalize="words"
              onChangeText={P3 => setPlayer3(P3)}
              style={{backgroundColor:'white'}}
            />
            <InputText
              label="Player2"
              value={Player4}
              autoCapitalize="words"
              onChangeText={P4 => setPlayer4(P4)}
              style={{backgroundColor:'white'}}
            />
          </TextContainer>
          {errmsg ? (
            <View style={styles.errorContainer}>
              <Text style={styles.textStyle}>{errmsg}</Text>
              <CrossButton onPress={() => seterrmsg(null)} />
            </View>
          ) : null}
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            mode="contained"
            style={styles.submitbutton}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </Button>
        </View>
      </BackCover>
      </KeyboardAvoidingView>
      </ScrollView>
    </TextCover>
  
  );
};
const styles = StyleSheet.create({
  styletext1: {
    fontSize: 30,
    color: '#eaed1f',
    marginTop: 1,
    marginBottom: 2,
  },
  styletext2: {
    fontSize: 30,
    color: '#eaed1f',
    marginBottom: 5,
    marginTop: 2,
  },
  submitbutton: {
    marginVertical: 15,
    backgroundColor: '#1d49db',
    padding: 8,
    borderRadius: 4,
    width: '50%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  textStyle: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 10,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    marginVertical: 5,
  },
});
