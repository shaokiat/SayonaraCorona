import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createAppContainer, 
  createSwitchNavigator
} from 'react-navigation'

import LogInScreen from './screens/LogInScreen';
import DashboardScreen from './screens/DashboardScreen';
import LoadingScreen from './screens/LoadingScreen';

import firebase from 'firebase';
import { firebaseConfig } from './config';
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exits/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}


export default function App() {
  return (
    <AppNavigator />
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LogInScreen: LogInScreen,
  DashboardScreen: DashboardScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
