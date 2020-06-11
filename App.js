import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Gallery from './Components/ImageGallery';
import Feed from './Components/Feed';
import Camera from './Components/Camera';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

export default class App extends Component {

    createHomeStack = () => 
    <Stack.Navigator>
        <Stack.Screen name="Latest News" component={Feed} />
    </Stack.Navigator>

    render() {
        return (
            <NavigationContainer>
                <BottomTabs.Navigator>
                    <BottomTabs.Screen name="Home" children={this.createHomeStack} 
                    options={{tabBarIcon: ({ color }) => (
                        <Ionicons name="ios-home" size={25} color={color} />
                      )}}/>
                    <BottomTabs.Screen name="Camera" component={Camera} 
                    options={{
                        tabBarIcon: ({ color }) => {
                          return <Ionicons name={'ios-camera'} size={30} color={color} />;
                        },
                      }}/>
                    <BottomTabs.Screen name="Gallery" component={Gallery} 
                    options={{tabBarIcon: ({ color }) => (
                        <Ionicons name="ios-images" size={25} color={color} />
                      )}}/>
                </BottomTabs.Navigator>
            </NavigationContainer>
        )
    }
}
