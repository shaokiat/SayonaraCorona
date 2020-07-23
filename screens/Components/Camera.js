import React, { Component, useState } from 'react';
import {
    Image, Text, View,
    StyleSheet, TextInput, TouchableOpacity,
    Dimensions, Modal, Alert
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { ActionSheet, Root } from 'native-base';
import DialogInput from 'react-native-dialog-input';

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

    // console.log(parsed);
    return parsed.responses[0].textAnnotations[0].description;
}


export default class Camera extends Component {
    state = {
        imageSelected: null,
        status: null,
        isAlertVisible: false
    }

    submit(inputText) {
        console.log(inputText);
        this.setState({ isAlertVisible: false })
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
            let asset = await MediaLibrary.createAssetAsync(uri);
            // asset['reading'] = 10;
            console.log(asset);
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

                this.uploadImage(uri, asset.filename); 

                const result = await callGoogleVisionAsync(base64)
                this.setState({ status: result })
            } catch (error) {
                console.log(error);
                this.setState({ status: `Reading not found. Please manually key in your temperature.` });
            }
        }

        if (this.state.imageSelected !== null) {
            return (
                <View style={styles.resultscontainer}>
                    <Image
                        source={{ uri: this.state.imageSelected.localUri }}
                        style={styles.thumbnail}
                    />
                    <View style={styles.temperatureview}>
                        <Text style={styles.instructions}>{this.state.status}</Text>
                        <Text style={styles.stepinstructions}>If above temperature is wrong, press "Key In" to manually enter your temperature.</Text>
                        <Text style={styles.stepinstructions}>Else, press "Save" to save your temperature reading.</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingRight: 20 }}>
                            <TouchableOpacity onPress={() => this.setState({ imageSelected: null })}>
                                <Text style={styles.button}>Save</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingLeft: 20 }}>
                            <TouchableOpacity onPress={() => this.setState({ isAlertVisible: true })} >
                                <Text style={styles.button}>Key In</Text>
                            </TouchableOpacity>
                            <DialogInput isDialogVisible={this.state.isAlertVisible}
                                title={"Corrected Temperature Readings"}
                                message={"Enter your temperature"}
                                hintInput={"Measured Temperature"}
                                submitInput={
                                    (inputText) => {this.setState ({status: inputText, isAlertVisible: false})}
                                }
                                closeDialog={() => this.setState( {isAlertVisible: false})}>
                            </DialogInput>
                        </View>
                    </View>
                </View>
            );
        };

        return (
            <Root>
                <View style={styles.instructionscontainer}>

                    <Image
                        source={require('../assets/splash.png')}
                        style={styles.logo} />
                    <Text style={styles.instructions}>
                        To upload a temperature reading, press button below!
                    </Text>
                    <View style={{alignContent: 'center'}}>
                    <Text style={styles.instructions}>
                        To ensure that the reading is accurate:
                    </Text>
                    
                    <Text style={styles.instructions}>1. Ensure no other words or numbers are present in the background and the foreground.</Text>
                    <Text style={styles.instructions}>2. Ensure that the image taken is sharp.</Text>
                    </View>
                    <TouchableOpacity onPress={() => openCameraAsync()} style={styles.button}>
                        <Text style={styles.buttonText}>Upload Temperature</Text>
                    </TouchableOpacity>

                </View>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    instructionscontainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultscontainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
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
        height: 400,
        resizeMode: 'contain'
    },
    stepinstructions: {
        color: '#888',
        fontSize: 12,
        marginHorizontal: 40,
        marginBottom: 20,
    },
    temperatureview: {
        paddingTop: 20
    }
});