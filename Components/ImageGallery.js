import React, { Component } from 'react';
import {
    Text, View,
    StyleSheet, TouchableWithoutFeedback,
    Dimensions, Modal, SafeAreaView, FlatList
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

import ImageElement from './ImageElement'


export default class ImageGallery extends Component {

    constructor(props) {
        super(props);
        this.requestPermission();
        this.state = {
            modalVisible: false,
            modalImage: require('./img/img1.jpg'),
            images: [
                require('./img/img1.jpg'),
                require('./img/img2.jpg'),
                require('./img/img3.jpg'),
                require('./img/img4.jpg'),
                require('./img/img5.jpg'),
            ]
        }
    }
    async requestPermission() {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    showPhoto = async () => {
        const album = await MediaLibrary.getAlbumAsync('Expo');
        const photosTemp = await MediaLibrary.getAssetsAsync({ album: album })
        const array = photosTemp.assets.map(asset => ({
            ...asset,
            type: asset.mediaType,
            timestamp: asset.creationTime,
            selected: false
        }))
        this.setState({ modalImage: photosTemp });
    }

    setModalVisible(visible, imageKey) {
        // this.setState({ modalImage: this.state.images[imageKey] });
        this.setState({ modalVisible: visible });
    }

    getImage() {
        return this.state.modalImage;
    }

    render() {
        this.showPhoto();

        let images = this.state.images.map((val, key) => {
            return (
                <TouchableWithoutFeedback
                    key={key}
                    onPress={() => { this.setModalVisible(true, key) }}>
                    <View style={styles.imageWrap}>
                        <ImageElement imgsource={val}></ImageElement>
                    </View>
                </TouchableWithoutFeedback>
            )
        });

        return (
            <SafeAreaView style={styles.container} >
                <Modal
                    style={styles.modal}
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { }}>
                    <View style={styles.modal}>
                        <Text style={styles.text} onPress={() => { this.setModalVisible(false) }}>
                            Close
                        </Text>
                        <ImageElement imgsource={this.state.modalImage} />
                    </View>

                </Modal>

                {images}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        flexWrap: 'wrap'
    },
    imageWrap: {
        margin: 2,
        padding: 2,
        backgroundColor: 'white',
        height: (Dimensions.get('window').height / 3) - 12,
        width: (Dimensions.get('window').width / 2) - 4,
    },
    modal: {
        flex: 1,
        padding: 40,
        backgroundColor: 'rgba(0,0,0,0.9)'
    },
    text: {
        color: 'white'
    }
});