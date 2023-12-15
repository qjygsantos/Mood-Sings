import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, StyleSheet, Modal, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setAlertTitle('Input Required');
      setAlertMessage('Please fill in both username and password.');
      setAlertVisible(true);
      return;
    }

    try {
      const response = await axios.post('http://192.168.246.10:3001/login', {
        username,
        password,
      });

      if (response.data.message === 'Login successful') {
        // Store a token or user session using AsyncStorage
        AsyncStorage.setItem('token', 'yourAuthToken');
        AsyncStorage.setItem('username', username);

        // Navigate to the Home screen
        navigation.navigate('Main');
      } else if (response.data.message === 'Username already exists') {
        setAlertTitle('Username Conflict');
        setAlertMessage('This username is already taken.');
        setAlertVisible(true);
      } else {
        setAlertTitle('Login Failed');
        setAlertMessage(response.data.message);
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertTitle('Login Error');
      setAlertMessage(error.message);
      setAlertVisible(true);
    }
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/MoodSingsLogo.png')}
        style={styles.logo}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          // Limit the username input to 20 characters with no spaces
          if (text.length <= 20 && !/\s/.test(text)) {
            setUsername(text);
          }
        }}
        style={[styles.input, { textAlign: 'center' }]}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          // Limit the password input to 20 characters with no spaces
          if (text.length <= 20 && !/\s/.test(text)) {
            setPassword(text);
          }
        }}
        style={[styles.input, { textAlign: 'center' }]}
      />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#097E53' : '#09E683', marginBottom: 10 },
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Modal
        visible={alertVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{alertTitle}</Text>
            <Text style={styles.modalMessage}>{alertMessage}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={closeAlert}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: '#9E711E',
  },
  logo: {
    width: 300,
    height: 235,
    marginBottom: 30,
    marginTop: 30,
  },
  input: {
    width: 250,
    height: 40,
    fontSize: 16,
    backgroundColor: '#F1B139',
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
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
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Center the text horizontally
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 10,
    alignItems: 'center', // Center the text horizontally
    textAlign: 'left', // Center the text horizontally
  },
  modalButton: {
    backgroundColor: '#09E683',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginScreen;