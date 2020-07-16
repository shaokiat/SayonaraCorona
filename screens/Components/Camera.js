import React, { Component, useState } from 'react';
import {
    Image, Text, View,
    StyleSheet, TextInput, TouchableOpacity,
    Dimensions, Modal
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { ActionSheet, Root } from 'native-base';

const API_KEY = 'AIzaSyC0g89TtZ3IRxhlzEb2fnwbrzGSe5AmJKk';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`

async function callGoogleVisionAsync(image) {
    const body = {
        requests: [
            {
                image: {
                    content: image,
                },
                features: [
                    { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 1 }
                ],
                "imageContext": {
                    "languageHints": ["en-t-i0-handwrit"]
                }
            },
        ],
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const parsed = await response.json();

    console.log(parsed);
    return parsed.responses[0].textAnnotations[0].description;
}

export default class Camera extends Component {
    state = {
        imageSelected: null,
        status: null
    }
    render() {
        openCameraAsync = async () => {

            let permissionCamera = await ImagePicker.requestCameraPermissionsAsync();

            if (permissionCamera.granted === false) {
                alert("Permission to access camera required!");
                return;
            }
            const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
                base64: true,
            });

            if (cancelled === true) {
                return;
            }
            this.setState({ imageSelected: { localUri: uri } });
            this.setState({ status: 'Loading...' })
            const asset = await MediaLibrary.createAssetAsync(uri);
            const albumExist = await MediaLibrary.getAlbumAsync('Thermometer records');
            if (albumExist == null) {
                MediaLibrary.createAlbumAsync('Thermometer records', asset)
                    .then(() => {
                        console.log('Album created!');
                    })
                    .catch(error => {
                        console.log('err', error);
                    });
            } else {
                MediaLibrary.addAssetsToAlbumAsync(asset, albumExist.id, false)
                    .then(() => {
                        console.log('Photo added!');
                    })
                    .catch(error => {
                        console.log('err', error);
                    });
            }
            try {
                const result = await callGoogleVisionAsync(base64)
                this.setState({ status: result })
            } catch (error) {
                console.log(error);
                this.setState({ status: `Error: ${error.message}` });
            }
        }

        if (this.state.imageSelected !== null) {
            return (
                <View style={styles.container}>
                    <Image
                        source={{ uri: this.state.imageSelected.localUri }}
                        style={styles.thumbnail}
                    />
                    <Text>{this.state.status}</Text>
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