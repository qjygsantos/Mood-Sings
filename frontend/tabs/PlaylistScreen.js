import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

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
    { id: '10', name: 'Michale Buble' },
    { id: '11', name: 'Ratatouille Vibes' },
    { id: '12', name: 'Hot Hits PH' },
    { id: '13', name: 'Slow Dancing' },
    { id: '14', name: 'New York Bar Classics' },
  ]);

  const numColumns = 3; // Number of columns per row

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity style={styles.playlistItem} onPress={() => handlePlaylistPress(item)}>
      <Text style={styles.playlistName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handlePlaylistPress = (playlist) => {
    // Handle the press event, e.g., navigate to the playlist details screen
    console.log(`Selected playlist: ${playlist.name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Playlist</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playlistItem: {
    width: itemWidth,
    padding: 15,
    marginBottom: 20,
    marginRight: 10,
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 8,
  },
  playlistName: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 

export default PlaylistScreen;
