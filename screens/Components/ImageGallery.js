import React, { Component } from 'react';
import {
    Text, View,
    StyleSheet, TouchableWithoutFeedback,
    Dimensions, Modal, FlatList
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
            data: [],
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
                // android requires reverse to show latest pic at the top
                const array = photosTemp.assets.map(asset => ({
                    ...asset,
                    type: asset.mediaType,
                    timestamp: asset.creationTime,
                    selected: false
                }))
                const dates = array.map(({ timestamp }) => new Date(timestamp));
                this.setState({ data: array, date: dates });
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

    setModalVisible(visible, imageId) {
        let image = this.state.data.filter((data) => data.id == imageId)[0];
        this.setState({ modalImage: image == undefined ? undefined : image.uri });
        this.setState({ modalVisible: visible });

    }

    getImage() {
        return this.state.modalImage;
    }

    renderItem(item) {
        const date = new Date(item.timestamp);
        return (
            <TouchableWithoutFeedback
                key={item.id}
                onPress={() => { this.setModalVisible(true, item.id) }}>
                <View style={styles.listView}>
                    <ImageElement imgsource={{ uri: item.uri }}></ImageElement>
                    <Text style={styles.description}>{date.toString()}</Text>
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
                            Close
                        </Text>

                        <ImageElement imgsource={{ uri: this.state.modalImage }} />
                    </View>

                </Modal>
                <FlatList
                    numColumns={1}
                    data={this.state.data}
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
    listView: {
        flexDirection: 'row',
        margin: 5,
        padding: 10,
        backgroundColor: 'lightblue',
        height: (Dimensions.get('window').height / 3),
        width: (Dimensions.get('window').width) - 10,
    },
    description: {
        padding: 20,
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
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