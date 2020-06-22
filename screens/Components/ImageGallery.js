import React, { Component } from 'react';
import {
    Text, View,
    StyleSheet, TouchableWithoutFeedback,
    Dimensions, Modal, SafeAreaView, FlatList
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import moment from "moment";

import ImageElement from './ImageElement'


export default class ImageGallery extends Component {

    constructor(props) {
        super(props);
        this.requestPermission();
        this.state = {
            modalVisible: false,
            modalImage: "",
            images: [],
            date: [],
            curr: '',
            isLoading: false,
        }
    }
    async requestPermission() {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    getData = () => {
        MediaLibrary.getAlbumAsync('Thermometer records').then(album => {
            MediaLibrary.getAssetsAsync({ album: album }).then(photosTemp => {
                const array = photosTemp.assets.map(asset => ({
                    ...asset,
                    type: asset.mediaType,
                    timestamp: asset.creationTime,
                    selected: false
                }))
                const uris = array.map(({ uri }) => uri);
                const dates = array.map(({ timestamp }) => new Date(timestamp));
                this.setState({ images: uris, date: dates });
            }).catch(err => {
                throw (err)
            });
        }).catch(err => {
            throw (err)
        });
    }
    componentDidMount() {
        this.getData();
    }

    setModalVisible(visible, imageKey) {
        this.setState({ modalImage: this.state.images[imageKey] });
        this.setState({ curr: this.state.date[imageKey] == undefined ? undefined : this.state.date[imageKey].toString() });
        this.setState({ modalVisible: visible });

    }

    getImage() {
        return this.state.modalImage;
    }

    renderItem(item) {
        return (
            <TouchableWithoutFeedback
                key={item.key}
                onPress={() => { this.setModalVisible(true, item.key) }}>
                <View style={styles.imageWrap}>
                    <ImageElement imgsource={{ uri: item }}></ImageElement>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {

        return (

            <View style={styles.container} >
                <Modal
                    style={styles.modal}
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { }}
                >
                    <View style={styles.modal} >
                        <Text style={styles.text} onPress={() => { this.setModalVisible(false) }}>
                            Close  {this.state.curr}
                        </Text>

                        <ImageElement imgsource={{ uri: this.state.modalImage }} />
                    </View>

                </Modal>
                <FlatList
                    numColumns={2}
                    data={this.state.images}
                    renderItem={({ item }) =>
                        this.renderItem(item)}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={this.state.isLoading}
                    onRefresh={() => this.getData()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
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