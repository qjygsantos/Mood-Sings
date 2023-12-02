import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { Linking } from 'react-native';

const PlaylistScreen = () => {
  const [playlists, setPlaylists] = useState([
    { id: '1', name: 'Chill Vibes' },
    { id: '2', name: 'Upbeat Hits' },
    { id: '3', name: 'Rock Classics' },
    { id: '4', name: 'Christmas Classics' },
    { id: '5', name: 'Jazz in the Background' },
    { id: '6', name: 'Christmas Hits' },
    { id: '7', name: 'Classic Road Trip Songs' },
    { id: '8', name: 'Cooking Jazz & Bossa' },
    { id: '9', name: 'Bossa Nova Covers' },
    { id: '10', name: 'Michael Buble' },
    { id: '11', name: 'Ratatouille Vibes' },
    { id: '12', name: 'Hot Hits PH' },
    { id: '13', name: 'Slow Dancing' },
    { id: '14', name: 'New York Bar Classics' },
  ]);

  const numColumns = 3; // Number of columns per row

  const animatedValue = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(animatedValue, { toValue: 1.1, duration: 100, useNativeDriver: false }),
      Animated.spring(animatedValue, { toValue: 1, friction: 3, tension: 40, useNativeDriver: false }),
    ]).start();
  };

  const renderPlaylistItem = ({ item }) => (
    <Animated.View
      style={[
        styles.playlistItem,
        {
          transform: [{ scale: animatedValue }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => handlePlaylistPress(item)}
        onPressIn={startAnimation}
        style={{ flex: 1 }}
      >
        <Text style={styles.playlistName}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const handlePlaylistPress = (playlist) => {
    // Handle the press event, e.g., navigate to the playlist details screen
    console.log(`Selected playlist: ${playlist.name}`);

    if (playlist.id === '1') {
      Linking.openURL('https://open.spotify.com/playlist/6IKQrtMc4c00YzONcUt7QH?si=408bdd6cc0e244da');
    }
    if (playlist.id === '2') {
      Linking.openURL('https://open.spotify.com/playlist/0t2A2rfRHsYVdAPybNGlUN?si=709302ae8c334117');
    }
    if (playlist.id === '3') {
      Linking.openURL('https://open.spotify.com/playlist/0t2A2rfRHsYVdAPybNGlUN?si=709302ae8c334117');
    }
    if (playlist.id === '4') {
      Linking.openURL('https://open.spotify.com/playlist/0t2A2rfRHsYVdAPybNGlUN?si=709302ae8c334117');
    }
    if (playlist.id === '5') {
      Linking.openURL('https://open.spotify.com/playlist/0t2A2rfRHsYVdAPybNGlUN?si=709302ae8c334117');
    }
    if (playlist.id === '6') {
      Linking.openURL('https://open.spotify.com/playlist/0t2A2rfRHsYVdAPybNGlUN?si=709302ae8c334117');
    }
    if (playlist.id === '7') {
      Linking.openURL('https://open.spotify.com/playlist/0t2A2rfRHsYVdAPybNGlUN?si=709302ae8c334117');
    }
    if (playlist.id === '8') {
      Linking.openURL('https://open.spotify.com/playlist/0t2A2rfRHsYVdAPybNGlUN?si=709302ae8c334117');
    }
    if (playlist.id === '9') {
      Linking.openURL('https://open.spotify.com/playlist/0t2A2rfRHsYVdAPybNGlUN?si=709302ae8c334117');
    }
    if (playlist.id === '10') {
      Linking.openURL('https://open.spotify.com/playlist/0t2A2rfRHsYVdAPybNGlUN?si=709302ae8c334117');
    }
    if (playlist.id === '11') {
      Linking.openURL('https://open.spotify.com/playlist/0t2A2rfRHsYVdAPybNGlUN?si=709302ae8c334117');
    }
    if (playlist.id === '12') {
      Linking.openURL('https://open.spotify.com/playlist/0t2A2rfRHsYVdAPybNGlUN?si=709302ae8c334117');
    }
    if (playlist.id === '13') {
      Linking.openURL('https://open.spotify.com/playlist/0t2A2rfRHsYVdAPybNGlUN?si=709302ae8c334117');
    }
    if (playlist.id === '14') {
      Linking.openURL('https://open.spotify.com/playlist/0t2A2rfRHsYVdAPybNGlUN?si=709302ae8c334117');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose your Playlist...</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={renderPlaylistItem}
        numColumns={numColumns} // Set the number of columns
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = (width - 80) / 3; // Calculate item width based on the screen width and padding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1B139',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
  },
  playlistItem: {
    width: itemWidth,
    padding: 15,
    marginBottom: 20,
    marginRight: 10,
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 8,
    backgroundColor: 'green',
  },
  playlistName: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontStyle: 'italic',
  },
});

export default PlaylistScreen;
