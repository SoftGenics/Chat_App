import {
  KeyboardAvoidingView,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {token, setToken} = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', {screen: 'Main'});
    }
  }, [token, navigation]);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post('http://10.0.2.2:4000/login', user)
      .then(response => {
        const token = response.data.token;
        AsyncStorage.setItem('authToken', token);
        setToken(token);
      })
      .catch(() => {
        Alert.alert('Login error', 'Invalid credentials. Please try again.');
      });
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/premium-photo/green-speech-bubble-is-green-background_1034303-352696.jpg?ga=GA1.1.121383371.1710929670&semt=ais_hybrid',
      }}
      style={{flex: 1, resizeMode: 'cover'}}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <ScrollView contentContainerStyle={{padding: 10, alignItems: 'center'}}>
          <KeyboardAvoidingView>
            <View
              style={{
                marginTop: 80,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 24, fontWeight: '700', color: 'white'}}>
                Login to your account
              </Text>
            </View>

            <View style={{marginTop: 50}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600', color: '#d3d3d3'}}>
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#f5f5f5"
                  style={{
                    width: 340,
                    marginTop: 10,
                    borderBottomColor: '#f5f5f5',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    fontSize: 16,
                    color: 'white',
                  }}
                  placeholder="Enter your email"
                />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#d3d3d3',
                  marginTop: 25,
                }}>
                Password
              </Text>
              <View>
                <TextInput
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#f5f5f5"
                  style={{
                    width: 340,
                    marginTop: 10,
                    borderBottomColor: '#f5f5f5',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    fontSize: 16,
                    color: 'white',
                  }}
                  placeholder="Enter your password"
                />
              </View>

              <Pressable
                onPress={handleLogin}
                style={{
                  width: 200,
                  backgroundColor: '#4A55A2',
                  padding: 15,
                  marginTop: 30,
                  borderRadius: 10,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Login
                </Text>
              </Pressable>

              <Pressable onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#d3d3d3',
                    fontSize: 16,
                    marginTop: 20,
                  }}>
                  Don't have an account? Sign Up
                </Text>
              </Pressable>
            </View>

            <View
              style={{
                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{width: 140, height: 170}}
                source={{
                  uri: 'https://signal.org/assets/images/features/Media.png',
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

