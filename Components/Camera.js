import React, { Component, useState } from 'react';
import {
    Image, Text, View,
    StyleSheet, TextInput, TouchableOpacity,
    Dimensions, Modal
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { ActionSheet, Root } from 'native-base';


export default class Camera extends Component {

    state = {
        imageSelected: null,
    }
    render() {

        openCameraAsync = async () => {
            let permissionCamera = await ImagePicker.requestCameraPermissionsAsync();

            if (permissionCamera.granted === false) {
                alert("Permission to access camera required!");
                return;
            }

            let launchCamera = await ImagePicker.launchCameraAsync();

            if (launchCamera.cancelled === true) {
                return;
            }
            this.setState({ imageSelected: { localUri: launchCamera.uri } });
            const asset = await MediaLibrary.createAssetAsync(launchCamera.uri);
            MediaLibrary.createAlbumAsync('Expo', asset)
                .then(() => {
                    console.log('Album created!');
                })
                .catch(error => {
                    console.log('err', error);
                });

        }

        if (this.state.imageSelected !== null) {
            return (
                <View style={styles.container}>
                    <Image
                        source={{ uri: this.state.imageSelected.localUri }}
                        style={styles.thumbnail}
                    />
                    <TouchableOpacity onPress={() => this.setState({ imageSelected: null })}>
                        <Text style={styles.button}>Back</Text>
                    </TouchableOpacity>

                </View>
            );
        };

        return (
            <Root>
                <View style={styles.container}>
                    <Image
                        source={require('../assets/splash.png')}
                        style={styles.logo} />
                    <Text style={styles.instructions}>
                        To upload a temperature reading, press button below!
        </Text>

                    <TouchableOpacity onPress={() => openCameraAsync()} style={styles.button}>
                        <Text style={styles.buttonText}>Upload Temperature</Text>
                    </TouchableOpacity>

                </View>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 20,
        resizeMode: 'contain'
    },
    instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 40,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 20,
        borderRadius: 10
    },
    buttonText: {
        fontSize: 20,
        color: 'black'
    },
    thumbnail: {
        width: 300,
        height: 500,
        resizeMode: 'contain'
    }
});