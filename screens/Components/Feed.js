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

  render() {
    return (
      <View>
        <ScrollView>
          <TouchableOpacity onPress={async () => {await WebBrowser.openBrowserAsync('https://www.moh.gov.sg/news-highlights/details/765-more-cases-discharged-218-new-cases-of-covid-19-infection-confirmed')}}>
            <View style={styles.news}>
              <View style={{
                borderBottomWidth: 1,
                borderTopWidth: 1,
                padding: 15
              }}>
              <Text>20 Jun 2020</Text>
              </View>
              <View style={{padding: 30}}>
                <Text style={{color:'#1e90ff'}}>765 More Cases Discharged; 218 New Cases of COVID-19 Infection Confirmed</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={async () => {await WebBrowser.openBrowserAsync('https://www.mfa.gov.sg/Newsroom/Press-Statements-Transcripts-and-Photos/2020/06/20200620-MFA-SC-Border-Restrictions')}}>
              <View style={{padding: 30, borderBottomWidth: 1}}>
                <Text style={{color:'#1e90ff'}}>MFA Spokesperson's Comments in response to Media Queries on Malaysia's Proposal to Lift Border Restrictions Between Singapore and Malaysia</Text>
              </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={async () => {await WebBrowser.openBrowserAsync('https://www.moh.gov.sg/news-highlights/details/218-new-cases-of-covid-19-infection')}}>
              <View style={{padding: 30, borderBottomWidth: 1}}>
                <Text style={{color:'#1e90ff'}}>218 New Cases of COVID-19 Infection</Text>
              </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={async () => {await WebBrowser.openBrowserAsync('https://www.mom.gov.sg/newsroom/press-releases/2020/0619-indicative-forecast-for-clearance-of-migrant-worker-dormitories')}}>
            <View style={styles.news}>
              <View style={{
                borderBottomWidth: 1,
                borderTopWidth: 1,
                padding: 15
              }}>
              <Text>19 Jun 2020</Text>
              </View>
              <View style={{padding: 30}}>
                <Text style={{color:'#1e90ff'}}>Indicative Forecast for Clearance of Migrant Worker Dormitories</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={async () => {await WebBrowser.openBrowserAsync('https://www.mnd.gov.sg/newsroom/speeches/view/speech-by-mos-zaqy-mohamad-at-the-virtual-engagement-session-with-the-real-estate-agency-industry')}}>
              <View style={{padding: 30, borderBottomWidth: 1}}>
                <Text style={{color:'#1e90ff'}}>Speech by MOS Zaqy Mohamad at the Virtual Engagement Session with the Real Estate Agency Industry</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={async () => {await WebBrowser.openBrowserAsync('https://www.mfa.gov.sg/Newsroom/Press-Statements-Transcripts-and-Photos/2020/06/20200619-Belt-and-Road-VC')}}>
              <View style={{padding: 30, borderBottomWidth: 1}}>
                <Text style={{color:'#1e90ff'}}>Minister for Foreign Affairs Dr Vivian Balakrishnan's participation in the “High-Level Videoconference on Belt and Road International Cooperation: Combating COVID-19 with Solidarity” </Text>
              </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={async () => {await WebBrowser.openBrowserAsync('https://www.moh.gov.sg/news-highlights/details/747-more-cases-discharged-142-new-cases-of-covid-19-infection-confirmed')}}>
              <View style={{padding: 30, borderBottomWidth: 1}}>
                <Text style={{color:'#1e90ff'}}>747 More Cases Discharged; 142 New Cases of COVID-19 Infection Confirmed </Text>
              </View>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={async () => {await WebBrowser.openBrowserAsync('https://moh.gov.sg/COVID-19/past-updates')}}>
              <View style={{padding: 30, borderBottomWidth: 2,
              borderTopWidth:1}}>
                <Text style={{fontSize: 20,
                color: '#00bfff'}}>Click here for the full list of past updates from various Singapore Government agencies.</Text>
              </View>
          </TouchableOpacity>

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
    borderBottomWidth: 1
  },
  Image: {
    width: 64,
    height: 64
  }
});