import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, FlatList, TouchableOpacity, Linking } from 'react-native';
import Animated, { Easing, withTiming, useSharedValue } from 'react-native-reanimated';

const HomeScreen = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [userInput, setUserInput] = useState('');

  const albumImages = [
    require('C:\\Users\\GSori\\OneDrive\\Documents\\4thYear\\EmTech3\\TeamTechDiggersProject\\frontend\\assets\\brunoMarsAlbum1.jpg'),
    require('C:\\Users\\GSori\\OneDrive\\Documents\\4thYear\\EmTech3\\TeamTechDiggersProject\\frontend\\assets\\queenAlbum1.jpg'),
    require('C:\\Users\\GSori\\OneDrive\\Documents\\4thYear\\EmTech3\\TeamTechDiggersProject\\frontend\\assets\\bubleAlbum1.jpg'),
  ];

  const opacity = useSharedValue(1);

  useEffect(() => {
    const interval = setInterval(() => {
      opacity.value = withTiming(0, { duration: 500, easing: Easing.ease });
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % albumImages.length);
        opacity.value = withTiming(1, { duration: 500, easing: Easing.ease });
      }, 500);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const detectEmotion = async (text) => {
    try {
      const response = await fetch('http://localhost:5000/detect-emotion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setRecommendedTracks(data.tracks);
        // Optional: Reset user input after processing
        setUserInput('');
      } else {
        console.error('Error detecting emotion:', response.status);
      }
    } catch (error) {
      console.error('Error detecting emotion:', error.message);
    }
  };

  const handleGoButtonPress = () => {
    // Trigger sentiment analysis when 'Go' button is pressed
    if (userInput.trim() !== '') {
      detectEmotion(userInput);
    }
  };

  const renderTrack = ({ item }) => (
    <TouchableOpacity style={styles.trackContainer} onPress={() => Linking.openURL(item.external_urls.spotify)}>
      <Image source={{ uri: item.album.images[0].url }} style={styles.trackImage} />
      <View style={styles.trackInfo}>
        <Text>{item.name} by {item.artists.map((artist) => artist.name).join(', ')}</Text>
        <Text style={styles.spotifyLink}>Listen on Spotify</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: albumImages[currentImage] }} // Corrected the source format
        style={[styles.headerImage, { opacity: opacity.value }]} // Accessed opacity value
        resizeMode="contain"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Mood Sings got you!</Text>
        <Text style={styles.subHeaderText}>
          Explore and Discover Amazing Features
        </Text>
        <View style={styles.featureContainer}>
          <FeatureItem title="About Us" icon="🗺️" />
          <FeatureItem title="Playlist on the go!" icon="🎨" />
          <FeatureItem title="Real-time Hits!" icon="🔄" />
        </View>
        {/* User Input Section */}
        <View style={styles.userInputContainer}>
          <TextInput
            style={styles.userInput}
            placeholder="How are you feeling today? E.g. (HAPPY, SAD, ANGRY, SURPRISE, FEAR)"
            value={userInput}
            onChangeText={(text) => setUserInput(text)}
          />
          <Button title="Go" onPress={handleGoButtonPress} />
        </View>
        {/* Recommended Tracks Section */}
        <View>
          <Text>Recommended Tracks:</Text>
          <FlatList
            data={recommendedTracks}
            keyExtractor={(item) => item.id}
            renderItem={renderTrack}
          />
        </View>
      </View>
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
  headerImage: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  userInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#09E683',
  },
  userInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    fontStyle: 'italic',
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
  },
  featureTitle: {
    marginTop: 5,
  },
});

export default HomeScreen;