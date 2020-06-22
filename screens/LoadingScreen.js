import React, { Component } from "react";
import {
    View,
    Text,
    Stylesheet,
    ActivityIndicator
} from 'react-native';
import firebase from 'firebase';

class LoadingScreen extends Component { 

  
    componentDidMount() {
        this.checkifLoggedIn();
    }
    checkifLoggedIn = () => {
        firebase.auth().onAuthStateChanged(
            function(user) {
                if (user) {
                    this.props.navigation.navigate('DashboardScreen');
                } else {
                    this.props.navigation.navigate('DashboardScreen');
                    // this.props.navigation.navigate('LogInScreen');
                }
            }.bind(this)
        )
    };
    render() {
        return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large"/>
                <Text style={{padding:30}}>Loading...</Text>
            </View>
        )
    }
}
export default LoadingScreen;
