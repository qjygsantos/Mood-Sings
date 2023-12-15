import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [displayedText, setDisplayedText] = useState('');

  // Get the username from AsyncStorage
  const getUsername = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      return username;
    } catch (error) {
      console.error('Error getting username:', error);
    }
  };

  const detectEmotion = async (text, username) => {
    try {
      const response = await fetch('http://192.168.246.10:5000/detect-emotion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, username }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendedTracks(data.tracks);
        // Set the displayed text
        setDisplayedText(text);
        // Save the input text to AsyncStorage
        saveUserInput(text, username);
        // Optional: Reset user input after processing
        setUserInput('');
      } else {
        console.error('Error detecting emotion:', response.status);
      }
    } catch (error) {
      console.error('Error detecting emotion:', error.message);
    }
  };

  const saveUserInput = async (text, username) => {
    try {
      const storedInputs = await AsyncStorage.getItem(`userInputs_${username}`);
      const inputs = storedInputs ? JSON.parse(storedInputs) : [];
      inputs.push(text);
      await AsyncStorage.setItem(`userInputs_${username}`, JSON.stringify(inputs));
    } catch (error) {
      console.error('Error saving user input:', error.message);
    }
  };

  const handleGoButtonPress = async () => {
    if (userInput.trim().length >= 10) {
      const username = await getUsername();
      if (username) {
        detectEmotion(userInput, username);
      } else {
        console.warn('Username not found. Please log in.');
        // Handle the case where the username is not found
      }
    } else {
      console.warn('Text is too short. Minimum length: 10 characters.');
      // You can provide user feedback or prevent the request here
    }
  };

  const renderTrack = ({ item }) => (
    <TouchableOpacity
      style={styles.trackContainer}
      onPress={() => Linking.openURL(item.external_urls.spotify)}
    >
      <Image source={{ uri: item.album.images[0].url }} style={styles.trackImage} />
      <View style={styles.trackInfo}>
        <Text>{item.name} by {item.artists.map((artist) => artist.name).join(', ')}</Text>
        <Text style={styles.spotifyLink}>Listen on Spotify</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>Welcome to Mood Sings</Text>

        <View style={styles.contentContainer}>
          <Text style={styles.subHeaderText}>Explore and Discover Amazing Features</Text>
          <View style={styles.featureContainer}>
            <FeatureItem title="Easy Navigation" icon="🗺️" />
            <FeatureItem title="Interactive UI" icon="🎨" />
            <FeatureItem title="Real-time Updates" icon="🔄" />
          </View>

          {/* User Input Section */}
          <View style={styles.userInputContainer}>
            <TextInput
              style={styles.userInput}
              multiline={true}
              placeholder="What's your mood today? E.g. (HAPPY, SAD, ANGRY, SURPRISE, FEAR) must also more than 10 characters"
              value={userInput}
              onChangeText={(text) => setUserInput(text)}
            />
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? '#097E53' : '#09E683', marginBottom: 10 },
              ]}
              onPress={handleGoButtonPress}
            >
              <Text style={styles.buttonText}>🎵</Text>
            </Pressable>
          </View>

          {/* Display Mood Text Section */}
          {displayedText !== '' && (
            <View style={styles.displayedTextContainer}>
              <Text style={styles.displayedText}>{displayedText}</Text>
            </View>
          )}

          {/* Recommended Tracks Section */}
          <Text style={styles.recommendedText}>Recommended Tracks:</Text>
          <FlatList
            data={recommendedTracks}
            keyExtractor={(item) => item.id}
            renderItem={renderTrack}
            style={styles.flatListContainer}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const FeatureItem = ({ title, icon }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1B139',
  },
  flatListContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
    marginTop: 30,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  recommendedText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 24,
    color: '#000',
  },
  featureTitle: {
    marginTop: 5,
    color: '#000',
  },
  userInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  userInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
  flatList: {
    flex: 1,
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  trackImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  trackInfo: {
    flex: 1,
  },
  spotifyLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  displayedTextContainer: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#09E683',
    borderRadius: 5,
    padding: 10,
    borderColor: '#097E53',
    borderWidth: 1,
  },
  displayedText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default HomeScreen;