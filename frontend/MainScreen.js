import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './tabs/HomeScreen';
import Songlist from './tabs/Songlist';
import PlaylistScreen from './tabs/PlaylistScreen';
import MeScreen from './tabs/MeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        activeBackgroundColor: '#F1B139',
        inactiveBackgroundColor: '#9E711E',
        activeTintColor: 'black',  // Text and icon color when active
        inactiveTintColor: 'black',  // Text and icon color when inactive
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Songlist"
        component={Songlist}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="music" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={PlaylistScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={MeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
