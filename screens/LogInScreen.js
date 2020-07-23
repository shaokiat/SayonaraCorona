import React, { Component } from "react";
import {
  View,
  Text,
  Stylesheet,
  Button,
  Image
} from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


class LogInScreen extends Component {
  
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            console.log('user signed in');
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now()
                })
                .then(function (snapshot) {
                  // console.log('Snapshot', snapshot)
                });
            } else {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .update({
                  last_logged_in: Date.now()
                })

            }

          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }
  async signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '419125723182-t6elg4cpte7d0kukp91li8vf5mov5hr0.apps.googleusercontent.com',
        // behavior: 'web',
        iosClientId: '419125723182-9adih756lgctp1jog448m662eau6k52i.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  render() {
    return (


      <View style={{

      }}>
        <View style={{
          justifyContent: 'center',
          alignItems:'center',
          paddingTop: 90
          }}>
        <Image
          source={require('../assets/splash.png')}
          style={{
            resizeMode: 'contain',
            width: 350,
            height: 350
          }
          } />
          <View style ={{
            paddingTop: 40
          }}>
        <Text style={{
          fontSize: 50
        }}>Sayonara Corona</Text>
        </View>

        <Text style={{
          fontStyle: 'italic',
          fontSize: 16
          }}>
          One step process to upload your temperature!
          </Text>

          </View>
        <View style={{
          paddingTop: 50
        }}>
          <Button
            title='Sign in with Google to continue'
            onPress={() => this.signInWithGoogleAsync()}
          />
        </View>
      </View>

    )
  }
}
export default LogInScreen;
