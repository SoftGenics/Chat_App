import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import Chat from '../components/Chat';

const ChatsScreen = () => {
  const [options, setOptions] = useState(['Chats']);
  const [chats, setChats] = useState([]);
  const [requests, setRequests] = useState([]);
  const {token, setToken, setUserId, userId} = useContext(AuthContext);

  const chooseOption = option => {
    if (options.includes(option)) {
      setOptions(options.filter(c => c !== option));
    } else {
      setOptions([...options, option]);
    }
  };

  const navigation = useNavigation();

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setToken('');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
      setToken(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      getrequests();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getrequests = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:4000/getrequests/${userId}`,
      );

      setRequests(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const acceptRequest = async requestId => {
    try {
      const response = await axios.post('http://10.0.2.2:4000/acceptrequest', {
        userId: userId,
        requestId: requestId,
      });

      if (response.status === 200) {
        await getrequests();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:4000/user/${userId}`);
      setChats(response.data);
    } catch (error) {
      console.log('Error fetching user', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={{uri: 'https://img.freepik.com/free-photo/blank-speech-bubble-blue-background_23-2147910067.jpg?ga=GA1.1.121383371.1710929670&semt=ais_hybrid'}}
        style={{flex: 1, resizeMode: 'cover'}}
      >
        <View style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Pressable onPress={logout}>
            <Image
              style={{width: 30, height: 30, borderRadius: 15}}
              source={{
                uri: 'https://www.shutterstock.com/image-vector/support-icon-can-be-used-600nw-1887496465.jpg',
              }}
            />
          </Pressable>

          <Text style={{fontSize: 18, fontWeight: '700', color: '#222'}}>Chats</Text>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <AntDesign name="camerao" size={26} color="#333" />
            <MaterialIcons
              onPress={() => navigation.navigate('People')}
              name="person-outline"
              size={26} color="#333"
            />
          </View>
        </View>

        <View style={{padding: 10}}>
          <Pressable
            onPress={() => chooseOption('Chats')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text style={{fontSize: 16, fontWeight: '600', color: '#333'}}>Chats</Text>
            <Entypo name="chevron-small-down" size={26} color="#333" />
          </Pressable>

          {options.includes('Chats') && (
            chats.length > 0 ? (
              <View>
                {chats.map(item => (
                  <Chat item={item} key={item?._id} />
                ))}
              </View>
            ) : (
              <View style={{
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{textAlign: 'center', color: '#666'}}>No Chats yet</Text>
                <Text style={{marginTop: 4, color: '#666'}}>Get started by messaging a friend</Text>
              </View>
            )
          )}

          <Pressable
            onPress={() => chooseOption('Requests')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}
          >
            <Text style={{fontSize: 16, fontWeight: '600', color: '#333'}}>Requests</Text>
            <Entypo name="chevron-small-down" size={26} color="#333" />
          </Pressable>

          {options.includes('Requests') && (
            <View style={{marginVertical: 12}}>
              <Text style={{fontSize: 15, fontWeight: '600', marginBottom: 12, color: '#333'}}>Check all the requests</Text>

              {requests.map(item => (
                <Pressable key={item?.from?._id} style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 12,
                  gap: 10,
                }}>
                  <Image
                    source={{uri: item?.from?.image}}
                    style={{width: 40, height: 40, borderRadius: 20}}
                  />
                  <View style={{flex: 1}}>
                    <Text style={{fontSize: 15, fontWeight: '600', color: '#333'}}>{item?.from?.name}</Text>
                    <Text style={{marginTop: 4, color: '#666'}}>{item?.message}</Text>
                  </View>
                  <Pressable
                    onPress={() => acceptRequest(item?.from?._id)}
                    style={{
                      padding: 8,
                      backgroundColor: '#005187',
                      width: 75,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{fontSize: 13, textAlign: 'center', color: '#fff'}}>Accept</Text>
                  </Pressable>
                  <AntDesign name="delete" size={26} color="red" />
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChatsScreen;

