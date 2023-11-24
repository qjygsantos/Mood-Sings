import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, Image, StyleSheet, Modal } from 'react-native';
import axios from 'axios';

function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSignup = async () => {
    if (!firstName || !lastName || !username || !password || !retypePassword) {
      setAlertTitle('Missing Information');
      setAlertMessage('Please fill in all fields.');
      setAlertVisible(true);
      return;
    }

    if (password !== retypePassword) {
      setAlertTitle('Passwords do not match');
      setAlertMessage('Please make sure your passwords match.');
      setAlertVisible(true);
      return;
    }
  
    try {
      // Make a POST request to the server for signup
      const response = await axios.post('http://localhost:3000/signup', {
        firstName,
        lastName,
        username,
        password,
      });
  
      if (response.data.message === 'Signup successful') {
        // If signup is successful, navigate to the Login screen
        navigation.navigate('Login');
      } else if (response.data.message === 'Username already exists') {
        setAlertTitle('Username Conflict');
        setAlertMessage('This username is already taken.');
        setAlertVisible(true);
      } else {
        setAlertTitle('Signup Failed');
        setAlertMessage(response.data.message);
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertTitle('Signup Error');
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
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => {
          setFirstName(text);
        }}
        style={[styles.input, { textAlign: 'center' }]}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => {
          setLastName(text);
        }}
        style={[styles.input, { textAlign: 'center' }]}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          // Limit the username input to 16 characters with no spaces
          if (text.length <= 16 && !/\s/.test(text)) {
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
          // Limit the password input to 16 characters with no spaces
          if (text.length <= 16 && !/\s/.test(text)) {
            setPassword(text);
          }
        }}
        style={[styles.input, { textAlign: 'center' }]}
      />
      <TextInput
        placeholder="Re-type Password"
        secureTextEntry
        value={retypePassword}
        onChangeText={(text) => {
          // Limit the password input to 16 characters with no spaces
          if (text.length <= 16 && !/\s/.test(text)) {
            setRetypePassword(text);
          }
        }}
        style={[styles.input, { textAlign: 'center' }]}
      />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#097E53' : '#09E683', marginBottom: 10 },
        ]}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
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
    marginBottom: 10,
    marginTop: 15,
  },
  input: {
    width: 250,
    height: 40,
    fontFamily: '../fonts/IBMPlexMono-Regular.ttf',
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
    fontFamily: '../fonts/IBMPlexMono-Regular.ttf',
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

export default SignUpScreen;
