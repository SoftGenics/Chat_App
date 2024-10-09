import { StyleSheet, Text, View, SafeAreaView, FlatList, ImageBackground } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import User from '../components/User';
import { useNavigation } from '@react-navigation/native';

const PeopleScreen = () => {
  const [users, setUsers] = useState([]);
  const { token, userId } = useContext(AuthContext);
  
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:4000/users/${userId}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log('users', users);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: 'https://img.freepik.com/free-photo/blank-speech-bubble-blue-background_23-2147910067.jpg?ga=GA1.1.121383371.1710929670&semt=ais_hybrid' }} // Replace with your background image URL
        style={{ flex: 1, resizeMode: 'cover' }}
      >
        <View style={{ flex: 1, padding: 10 }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '500',
              marginTop: 12,
              color: '#333', // Adjust color if needed for better visibility
            }}
          >
            People using Signal Chat
          </Text>

          <FlatList
            data={users}
            renderItem={({ item }) => <User item={item} key={item?._id} />}
            keyExtractor={item => item._id} // Ensure keyExtractor is used for FlatList
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PeopleScreen;

const styles = StyleSheet.create({});
