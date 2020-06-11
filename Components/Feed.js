import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default class feed extends Component {
  state = {
    result: null,
  };
  _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://www.gov.sg/features/covid-19');
    this.setState({ result });
  };

  render() {
    return (
      <View>
        <ScrollView>
          <TouchableOpacity onPress={this._handlePressButtonAsync}>
            <View style={styles.news}>
              <Image
                source={require('../assets/splash.png')}
                style={styles.Image}
              />
              <View style={{ marginLeft: 30 }}>
                <Text style={{ fontSize: 20 }}>News Header</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.news}>
            <Image
              source={require('../assets/splash.png')}
              style={styles.Image}
            />
            <View style={{ marginLeft: 30 }}>
              <Text style={{ fontSize: 20 }}>News Header</Text>
            </View>
          </View>
          <View style={styles.news}>
            <Image
              source={require('../assets/splash.png')}
              style={styles.Image}
            />
            <View style={{ marginLeft: 30 }}>
              <Text style={{ fontSize: 20 }}>News Header</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerfont: {
    fontWeight: 'bold',
    fontSize: 25
  },
  news: {
    flexDirection: 'row',
    padding: 30,
    borderColor: '#1E90FF',
    borderBottomWidth: 1
  },
  Image: {
    width: 64,
    height: 64
  }
});