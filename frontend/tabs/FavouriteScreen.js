import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavouriteScreen = ({ route }) => {
  const { params } = route;
  const [playlist, setPlaylist] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const loadPlaylistFromStorage = async () => {
      try {
        // Load username from AsyncStorage
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);

          // Load playlist from AsyncStorage based on the username
          const storedPlaylist = await AsyncStorage.getItem(`playlist_${storedUsername}`);
          if (storedPlaylist) {
            const parsedPlaylist = JSON.parse(storedPlaylist);
            setPlaylist(parsedPlaylist);
          }

          // If a new song is passed in params, add it to the playlist
          if (params?.song) {
            setPlaylist((prevPlaylist) => [...prevPlaylist, params.song]);
            // Save updated playlist to AsyncStorage
            await AsyncStorage.setItem(`playlist_${storedUsername}`, JSON.stringify([...playlist, params.song]));
          }
        }
      } catch (error) {
        console.error('Error loading playlist:', error);
      }
    };

    loadPlaylistFromStorage();
  }, [params]);

  const handleLinkPress = (link) => {
    console.log('Opening Spotify link:', link);
    Linking.openURL(link);
  };

  const handleDelete = async (index) => {
    const updatedPlaylist = [...playlist];
    updatedPlaylist.splice(index, 1);
    setPlaylist(updatedPlaylist);
    // Save updated playlist to AsyncStorage
    await AsyncStorage.setItem(`playlist_${username}`, JSON.stringify(updatedPlaylist));
  };

  const renderSong = ({ item, index }) => (
    <TouchableOpacity style={styles.songContainer}>
      {item.album_image && <Image source={{ uri: item.album_image }} style={styles.albumImage} />}
      <View style={styles.textContainer}>
        <Text>{item.name} by {item.artists.join(', ')}</Text>
        <TouchableOpacity onPress={() => handleLinkPress(item.spotify_link)}>
          <Text style={styles.linkText}>Spotify Link</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleDelete(index)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Favourite Songs</Text>
      <FlatList
        data={playlist}
        keyExtractor={(item) => item.name}
        renderItem={renderSong}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1B139',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    marginTop: 30,
  },
  flatList: {
    flex: 1,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  albumImage: {
    width: 50,
    height: 50,
    marginVertical: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
  },
});

export default FavouriteScreen;