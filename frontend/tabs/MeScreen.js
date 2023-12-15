import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userInputs, setUserInputs] = useState([]);

  useEffect(() => {
    const getUsernameFromStorage = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          const response = await fetch(`http://192.168.246.10:3002/user/${username}`);
          if (response.ok) {
            const userData = await response.json();
            setUserData(userData);
          }

          const storedInputs = await AsyncStorage.getItem(`userInputs_${username}`);
          if (storedInputs) {
            const inputs = JSON.parse(storedInputs);
            setUserInputs(inputs);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUsernameFromStorage();
  }, []);

  const handleLogOut = () => {
    AsyncStorage.removeItem('username');
    navigation.navigate('Welcome');
  };

  const handleClearInputs = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      await AsyncStorage.removeItem(`userInputs_${username}`);
      setUserInputs([]);
      Alert.alert('Success', 'User inputs cleared successfully.');
    } catch (error) {
      console.error('Error clearing user inputs:', error);
      Alert.alert('Error', 'Failed to clear user inputs.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.userInfo}>
        {userData ? (
          <>
            <Text style={styles.username}>Username: {userData.username}</Text>
            <Text style={styles.name}>Name: {userData.firstName} {userData.lastName}</Text>
            <Text style={styles.name}>User Inputs:</Text>
            <Text style={styles.userInputs}>
              {userInputs.map((input, index) => (
                `${index + 1}. ${input}\n`
              ))}
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? '#097E53' : '#09E683', marginTop: 10 },
              ]}
              onPress={handleClearInputs}
            >
              <Text style={styles.buttonText}>Clear Inputs</Text>
            </Pressable>
          </>
        ) : (
          <Text>Loading user data...</Text>
        )}
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#097E53' : '#09E683', marginTop: 10 },
        ]}
        onPress={handleLogOut}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
    </ScrollView>
  );
};

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
    textAlign: 'left',
    marginBottom: 10,
  },
  name: {
    textAlign: 'left',
    fontSize: 20,
    color: 'black',
  },
  userInputs: {
    textAlign: 'left',
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  userInfo: {
    marginBottom: 20,
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
    fontSize: 20,
    color: 'black',
  },
});

export default MeScreen;