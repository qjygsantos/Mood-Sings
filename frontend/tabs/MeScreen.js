import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch the username from AsyncStorage
    const getUsernameFromStorage = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          // Retrieve user data from the server based on the username
          axios.get(`http://localhost:3002/user/${username}`)
            .then((response) => {
              console.log('User Data from Server:', response.data);
              setUserData(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUsernameFromStorage();
  }, []);

  const handleLogOut = () => {
    // Perform logout actions (e.g., clear AsyncStorage, navigate to the Welcome screen)
    AsyncStorage.removeItem('username'); // Clear the stored username
    navigation.navigate('Welcome');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.userInfo}>
        {userData ? (
          <>
            <Text style={styles.username}>Username: {userData.username}</Text>
            <Text style={styles.name}>Name: {userData.firstName} {userData.lastName}</Text>
          </>
        ) : (
          <Text>Loading user data...</Text>
        )}
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#097E53' : '#09E683', marginTop: 100},
        ]}
        onPress={handleLogOut}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1B139',
  },
  username: {
    fontSize: 20,
    color: 'black',
    textAlign: 'left', // Left-align the text
    marginBottom: 10,
    fontFamily: '../fonts/IBMPlexMono-Regular.ttf',
  },
  name: {
    textAlign: 'left', // Left-align the text
    fontFamily: '../fonts/IBMPlexMono-Regular.ttf',
    fontSize: 20,
    color: 'black',
  },
  button: {
    width: 140,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: '../fonts/IBMPlexMono-Regular.ttf',
    fontSize: 20,
    color: 'black',
  },
});

export default MeScreen;
