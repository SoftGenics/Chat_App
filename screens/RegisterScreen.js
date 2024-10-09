import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };

    axios
      .post('http://10.0.2.2:4000/register', user)
      .then(response => {
        console.log(response);
        Alert.alert(
          'Registration successful',
          'You have been registered successfully!',
        );
        setName('');
        setEmail('');
        setPassword('');
        setImage('');
      })
      .catch(error => {
        Alert.alert(
          'Registration error',
          'An error occurred while registering!',
        );
      });
  };

  return (
    <ImageBackground
      source={{uri: 'https://img.freepik.com/premium-photo/green-speech-bubble-is-green-background_1034303-352696.jpg?ga=GA1.1.121383371.1710929670&semt=ais_hybrid'}}
      style={{flex: 1, resizeMode: 'cover'}}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <ScrollView contentContainerStyle={{padding: 10, alignItems: 'center'}}>
          <KeyboardAvoidingView>
            <View
              style={{
                marginTop: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 24, fontWeight: '700', color: 'white'}}>
                Set up your profile
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  color: '#d3d3d3',
                  textAlign: 'center',
                  marginHorizontal: 12,
                  fontSize: 16,
                }}>
                Profiles are visible to your friends, connections, and groups
              </Text>

              <Pressable style={{marginTop: 20}}>
                <Image
                  source={{
                    uri: image
                      ? image
                      : 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
                  }}
                  style={{width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: 'white'}}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 6,
                    color: '#d3d3d3',
                    fontSize: 14,
                  }}>
                  Add Image
                </Text>
              </Pressable>
            </View>

            <View style={{marginTop: 30}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600', color: '#d3d3d3'}}>
                  Name
                </Text>

                <TextInput
                  value={name}
                  onChangeText={setName}
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
                  placeholder="Enter your name"
                />

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#d3d3d3',
                    marginTop: 25,
                  }}>
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

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#d3d3d3',
                    marginTop: 25,
                  }}>
                  Password
                </Text>

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

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#d3d3d3',
                    marginTop: 25,
                  }}>
                  Image URL
                </Text>

                <TextInput
                  value={image}
                  onChangeText={setImage}
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
                  placeholder="Enter your image URL"
                />
              </View>

              <Pressable
                onPress={handleRegister}
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
                  Register
                </Text>
              </Pressable>

              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#d3d3d3',
                    fontSize: 16,
                    marginTop: 20,
                  }}>
                  Already have an account? Sign In
                </Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;
