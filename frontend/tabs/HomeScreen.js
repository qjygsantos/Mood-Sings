import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // List of different music album images
  const albumImages = [
    require('C:\\Users\\GSori\\OneDrive\\Documents\\4thYear\\EmTech3\\TeamTechDiggersProject\\frontend\\assets\\brunoMarsAlbum1.jpg'),
    require('C:\\Users\\GSori\\OneDrive\\Documents\\4thYear\\EmTech3\\TeamTechDiggersProject\\frontend\\assets\\queenAlbum1.jpg'),
    require('C:\\Users\\GSori\\OneDrive\\Documents\\4thYear\\EmTech3\\TeamTechDiggersProject\\frontend\\assets\\bubleAlbum1.jpg'),
    // Add more image paths as needed
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

  return (
    <View style={styles.container}>
      <Animated.Image
        source={albumImages[currentImage]}
        style={[styles.headerImage, { opacity: opacity }]}
        resizeMode="contain"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Welcome to Our App</Text>
        <Text style={styles.subHeaderText}>
          Explore and Discover Amazing Features
        </Text>
        <View style={styles.featureContainer}>
          <FeatureItem title="Easy Navigation" icon="🗺️" />
          <FeatureItem title="Interactive UI" icon="🎨" />
          <FeatureItem title="Real-time Updates" icon="🔄" />
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
    backgroundColor: '#fff',
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
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  featureTitle: {
    fontSize: 14,
  },
});

export default HomeScreen;
