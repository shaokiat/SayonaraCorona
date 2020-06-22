import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Gallery from './Components/ImageGallery';
import Feed from './Components/Feed';
import Camera from './Components/Camera';
import firebase from 'firebase';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

export default class DashboardScreen extends Component {

  createHomeStack = () =>
    <Stack.Navigator>
      <Stack.Screen name="Latest News" component={Feed} 
      options={{
            title: "Latest News",
 
            headerRight: () => (
              <Button
                onPress={() => firebase.auth().signOut()}
                title="Sign Out"
                color="blue"
              />
            ),
          }}/>
    </Stack.Navigator>

  createGalleryStack = () =>
    <Stack.Navigator>
      <Stack.Screen name="Gallery" component={Gallery}
        />
    </Stack.Navigator>

  render() {
    return (
      <NavigationContainer>
        <BottomTabs.Navigator>
          <BottomTabs.Screen name="Home" children={this.createHomeStack}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-home" size={25} color={color} />
              )
            }} />
          <BottomTabs.Screen name="Camera" component={Camera}
            options={{
              tabBarIcon: ({ color }) => {
                return <Ionicons name={'ios-camera'} size={30} color={color} />;
              },
            }} />
          <BottomTabs.Screen name="Gallery" children={this.createGalleryStack}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-images" size={25} color={color} />
              )
            }} />
        </BottomTabs.Navigator>
      </NavigationContainer>
    )
  }
}
