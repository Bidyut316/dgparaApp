import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthenticationContext} from '../services/auth/authcontext';
import {AuthenticationContextProvider} from '../services/auth/authcontext';
import {NavigationMaterial} from './dashbord.screen';

export const LoginMain = () => {
  const {isAuthenticated} = useContext(AuthenticationContext);
  //const isAuthenticated=false;
  return <>{isAuthenticated ? <NavigationMaterial /> : <LoginScreen />}</>;
};
export const LoginScreen = () => {
  const {onLogin, error, isLoading} = useContext(AuthenticationContext);
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };
  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: 'white',
          },
        ]}>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <Text
              style={[
                styles.text_footer,
                {
                  color: '#333333',
                },
              ]}>
              Username
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={'#333333'} size={20} />
              <TextInput
                placeholder="Your Username"
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  {
                    color: '#333333',
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => textInputChange(val)}
                onEndEditing={e => handleValidUser(e.nativeEvent.text)}
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {data.isValidUser ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Username must be 4 characters long.
                </Text>
              </Animatable.View>
            )}
            <Text
              style={[
                styles.text_footer,
                {
                  color: '#333333',
                  marginTop: 35,
                },
              ]}>
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color={'#333333'} size={20} />
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  styles.textInput,
                  {
                    color: '#333333',
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => handlePasswordChange(val)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {error && (
              <View>
                <Text variant="error">{error}</Text>
              </View>
            )}
            {data.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Password must be 8 characters long.
                </Text>
              </Animatable.View>
            )}
            <TouchableOpacity>
              <Text style={{color: '#009387', marginTop: 15}}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            {!isLoading ? (
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => onLogin(data.username, data.password)}>
                  <LinearGradient
                    colors={['#1d49db', '#1d49db']}
                    style={styles.signIn}>
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: '#fff',
                        },
                      ]}>
                      Sign In
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <ActivityIndicator animating={true} color={'#006ec7'} />
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bfff',
  },
  header: {
    flex: 0.5,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    margin: 20,
  },
});
