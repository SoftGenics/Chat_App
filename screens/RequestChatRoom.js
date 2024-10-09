
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';

const RequestChatRoom = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const {token, userId} = useContext(AuthContext);
  const route = useRoute();

  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Ionicons name="arrow-back" size={28} color="black" />
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
            {route?.params?.name}
          </Text>
        </View>
      ),
    });
  }, []);

  const sendMessage = async () => {
    try {
      const userData = {
        senderId: userId,
        receiverId: route?.params?.receiverId,
        message: message,
      };

      const response = await axios.post(
        'http://10.0.2.2:4000/sendrequest',
        userData,
      );
      if (response.status === 200) {
        setMessage('');
        Alert.alert(
          'Your request has been shared',
          'Wait for the user to accept your request',
        );
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ImageBackground
        source={{
          uri: 'https://img.freepik.com/premium-vector/dialogue-balloon-chat-bubble-icons-seamless-pattern-textile-pattern-wrapping-paper-linear-vector-print-fabric-seamless-background-wallpaper-backdrop-with-speak-bubbles-chat-message-frame_8071-58894.jpg',
        }}
        style={{flex: 1, justifyContent: 'center'}}
        resizeMode="cover">
        <ScrollView />

        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: '#dddddd',
            marginBottom: 20,
          }}>
          <Entypo name="emoji-happy" size={24} color="gray" />

          <TextInput
            placeholder="Type your message..."
            placeholderTextColor="#555" // Darkened placeholder text
            value={message}
            onChangeText={setMessage}
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: '#dddddd',
              borderRadius: 20,
              paddingHorizontal: 10,
              marginLeft: 10,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginHorizontal: 8,
            }}>
            <Entypo name="camera" size={24} color="gray" />
            <Feather name="mic" size={24} color="gray" />
          </View>

          <Pressable
            onPress={sendMessage}
            style={{
              backgroundColor: '#0066b2',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}>
              Send
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default RequestChatRoom;
