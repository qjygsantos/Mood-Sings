// Songlist.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Songlist = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const navigation = useNavigation();

  const searchSongs = async () => {
    try {
      const response = await fetch(`http://192.168.246.10:5001/search-songs?query=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setSongs(data.songs);
      } else {
        console.error('Error searching songs:', response.status);
      }
    } catch (error) {
      console.error('Error searching songs:', error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      searchSongs();
    } else {
      fetch('http://192.168.246.10:5001/search-songs')
        .then(response => response.json())
        .then(data => setSongs(data.songs))
        .catch(error => console.error('Error fetching all songs:', error.message));
    }
  }, [searchQuery]);

  const handleLinkPress = (link) => {
    console.log('Opening Spotify link:', link);
  };

  const handleHeartClick = (song) => {
    navigation.navigate('Favourites', { song });
  };

  const renderSong = ({ item }) => (
    <View style={styles.songContainer}>
      {item.album_image && <Image source={{ uri: item.album_image }} style={styles.albumImage} />}
      <View style={styles.textContainer}>
        <Text>{item.name} by {item.artists.join(', ')}</Text>
        <TouchableOpacity onPress={() => handleLinkPress(item.spotify_link)}>
          <Text style={styles.linkText}>Spotify Link</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleHeartClick(item)}>
        <Text style={styles.heartSymbol}>❤️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for songs or artists"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={songs}
        keyExtractor={(item) => item.name}
        renderItem={renderSong}
        style={styles.flatListContainer}
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
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  flatListContainer: {
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
  heartSymbol: {
    fontSize: 20,
    color: 'red',
  },
});

export default Songlist;