import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Navigate to the "Login" screen when the "Login" button is pressed.
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    // Navigate to the "SignUp" screen when the "Sign Up" button is pressed.
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/MoodSingsLogo.png')}
        style={styles.logo}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#097E53' : '#09E683', 
              marginBottom: 10,},
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#7E6109' : '#09E683' },
          ]}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: '#9E711E',
  },
  logo: {
    marginTop: 50,
    width: 359,
    height: 292,
  },
  buttonContainer: {
    marginTop: 50,
  },
  button: {
    width: 200,
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

export default WelcomeScreen;
